const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

const userRouter = express.Router();

userRouter.get("/user/requests/received", userAuth, async (req, res, next) => {
    try {
        const loggedInUserId = req.user?._id;

        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUserId,
            status: "interested"
        }).populate(
            "fromUserId",
            "firstName lastName gender age photoUrl about skills"
        );

        if (!connectionRequests.length) {
            return res.status(200).json({
                success: true,
                message: "No connection Requests"
            })
        }
        res.status(200).json({
            success: true,
            requests: connectionRequests
        })
    } catch (err) {
        next(err);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res, next) => {
    try {
        const loggedInUserId = req.user?._id;

        const USER_SAFE_DATA = "firstName lastName gender age photoUrl about skills"

        const connections = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUserId },
                { toUserId: loggedInUserId },
            ],
            status: "accepted"
        })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA)

        if (!connections.length) {
            return res.status(200).json({
                message: "No connections"
            })
        }

        const data = connections.map(obj => {
            if (obj.fromUserId._id.toString() === loggedInUserId.toString()) {
                return obj.toUserId;
            }
            return obj.fromUserId;
        })

        res.status(200).json({
            success: true,
            totalConnections: connections.length,
            connections: data
        })
    } catch (err) {
        next(err);
    }
})

userRouter.get("/feed", userAuth, async (req, res, next) => {
    const USER_SAFE_FIELD =
        "firstName lastName gender age photoUrl about skills memberships";

    try {
        const page = parseInt(req.query?.page) || 1;
        let limit = parseInt(req.query?.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const loggedInUserId = req.user?._id;

        // 1️⃣ Find users to hide
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUserId },
                { toUserId: loggedInUserId },
            ],
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = connectionRequests.map((obj) => {
            if (obj.fromUserId.toString() === loggedInUserId.toString()) {
                return obj.toUserId;
            }
            return obj.fromUserId;
        });

        // 2️⃣ Aggregation with PRIORITY
        const feed = await User.aggregate([
            {
                $match: {
                    _id: {
                        $nin: hideUsersFromFeed,
                        $ne: loggedInUserId,
                    },
                },
            },

            // ⭐ ADD PRIORITY FIELD
            {
                $addFields: {
                    priority: {
                        $cond: [
                            { $eq: ["$memberships.Gold.active", true] },
                            2,
                            {
                                $cond: [
                                    { $eq: ["$memberships.Silver.active", true] },
                                    1,
                                    0,
                                ],
                            },
                        ],
                    },
                },
            },

            // ⭐ SORT BY PRIORITY (Gold > Silver > Normal)
            {
                $sort: { priority: -1 },
            },

            // Pagination
            { $skip: skip },
            { $limit: limit },

            // Safety: remove unwanted fields
            {
                $project: {
                    priority: 0, // hide internal field
                },
            },
        ]);

        if (!feed.length) {
            return res.status(200).json({
                success: true,
                message: "No Users Found",
                feed: [],
            });
        }

        res.status(200).json({
            success: true,
            feed,
        });
    } catch (err) {
        next(err);
    }
});

userRouter.get("/user/smart-matches", userAuth, async (req, res, next) => {
    try {
        const loggedInUserId = req.user._id;

        // 1️⃣ Get logged-in user skills
        const me = await User.findById(loggedInUserId).select("skills");
        const mySkills = (me.skills || []).map(s => s.toLowerCase());

        // 2️⃣ Find users already interacted with (hide them)
        const requests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUserId },
                { toUserId: loggedInUserId }
            ]
        }).select("fromUserId toUserId");

        const hiddenUserIds = requests.map(r =>
            r.fromUserId.equals(loggedInUserId) ? r.toUserId : r.fromUserId
        );

        // 3️⃣ Fetch remaining users (all card-required fields)
        const users = await User.find({
            _id: { $nin: hiddenUserIds, $ne: loggedInUserId }
        }).select(
            "firstName lastName age gender about photoUrl skills memberships"
        );

        // 4️⃣ Skill match calculation (Jaccard similarity)
        const getMatchScore = (mySkills, userSkills) => {
            const a = new Set(mySkills);
            const b = new Set((userSkills || []).map(s => s.toLowerCase()));

            const common = [...a].filter(skill => b.has(skill));
            const total = new Set([...a, ...b]);

            if (total.size === 0) return 0;
            return Math.round((common.length / total.size) * 100);
        };

        // 5️⃣ Build final response for cards
        const matches = users
            .map(user => {
                const matchScore = getMatchScore(mySkills, user.skills);

                return {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    gender: user.gender,
                    about: user.about,
                    photoUrl: user.photoUrl,
                    skills: user.skills,
                    memberships: user.memberships,
                    matchScore, // ⭐ IMPORTANT (UI uses this)
                };
            })
            .filter(u => u.matchScore > 0) // optional: hide 0% matches
            .sort((a, b) => b.matchScore - a.matchScore); // highest first

        return res.status(200).json({
            success: true,
            totalMatches: matches.length,
            matches,
        });

    } catch (err) {
        next(err);
    }
});

userRouter.get("/user/search", userAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { query } = req.query;

        // 🔐 Validation
        if (!query) {
            return res.status(400).json({ message: "Search query required" });
        }

        const safeQuery = query.trim();

        if (safeQuery === "") {
            return res.status(400).json({ message: "Search query required" });
        }

        // 📄 Pagination
        const page = parseInt(req.query.page) || 1;
        const limit = 9;
        const skip = (page - 1) * limit;

        // 🔍 Split query words
        const words = safeQuery.split(" ").filter(Boolean);

        let nameCondition;

        // 🟢 Single word search
        if (words.length === 1) {
            nameCondition = {
                $or: [
                    { firstName: { $regex: "^" + words[0], $options: "i" } },
                    { lastName: { $regex: "^" + words[0], $options: "i" } }
                ]
            };
        }

        // 🟢 Two words search (rahul sharma)
        else {
            nameCondition = {
                $and: [
                    { firstName: { $regex: "^" + words[0], $options: "i" } },
                    { lastName: { $regex: "^" + words[1], $options: "i" } }
                ]
            };
        }

        // 1️⃣ Get all connection records of logged-in user
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUserId },
                { toUserId: loggedInUserId }
            ]
        }).select("fromUserId toUserId");

        // 2️⃣ Build exclude list
        const excludeUsers = connectionRequests.map((conn) =>
            conn.fromUserId.toString() === loggedInUserId.toString()
                ? conn.toUserId
                : conn.fromUserId
        );

        // 3️⃣ Final Query
        const users = await User.find({
            $and: [
                nameCondition,
                {
                    _id: { $nin: [...excludeUsers, loggedInUserId] }
                }
            ]
        })
            .select(
                "firstName lastName photoUrl age gender about skills memberships"
            )
            .skip(skip)
            .limit(limit);

        res.status(200).json(users);

    } catch (err) {
        console.error("SEARCH ERROR:", err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

module.exports = userRouter;
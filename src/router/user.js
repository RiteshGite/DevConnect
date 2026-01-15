const express = require("express");
const ConnectionRequest = require("../models/connectionRequest");
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");

const userRouter = express.Router();

// get all the pending connection requests for the loggedInUser
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
            return res.status(400).json({
                success: false,
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
                {fromUserId: loggedInUserId},
                {toUserId: loggedInUserId},
            ],
            status: "accepted"
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA)

        if(!connections.length) {
            return res.status(200).json({
                message: "No connections"
            })
        }

        const data = connections.map(obj => {
            if(obj.fromUserId._id.toString() === loggedInUserId.toString()) {
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

userRouter.get("/user/feed", userAuth, async (req, res, next) => {
    const USER_SAFE_FIELD = "firstName lastName gender age photoUrl about skills";
    try {
        const loggedInUserId = req.user?._id;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUserId },
                { toUserId: loggedInUserId }
            ]
        }).select("fromUserId toUserId")

        const hideUsersFromFeed = connectionRequests.map(obj => {
            if(obj.fromUserId.toString() === loggedInUserId.toString()) {
                return obj.toUserId;
            }
            return obj.fromUserId;
        })

        const showUsersInFeed = await User.find({
            $and: [
                {_id: {$nin: hideUsersFromFeed } },
                {_id: {$ne: loggedInUserId } }
            ]
        }).select(USER_SAFE_FIELD);

        if(!showUsersInFeed.length) {
            return res.status(200).json({
                success: true,
                message: "No Users Found"
            })
        }
        res.status(200).json({
            success: true,
            feed: showUsersInFeed
        })
    } catch (err) {
        next(err);
    }
})

module.exports = userRouter;
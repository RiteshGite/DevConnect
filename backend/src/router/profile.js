const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const validator = require("validator");
const upload = require("../middlewares/upload");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../config/s3");

/* ================= VIEW PROFILE ================= */
profileRouter.get("/profile/view", userAuth, async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (err) {
        next(err);
    }
});

/* ================= EDIT PROFILE (TEXT + IMAGE) ================= */
profileRouter.put(
    "/profile/edit",
    userAuth,
    upload.single("profilePic"),
    async (req, res, next) => {
        try {
            const user = req.user;

            const allowedFields = [
                "firstName",
                "lastName",
                "age",
                "about",
                "gender",
                "skills",
            ];

            allowedFields.forEach((field) => {
                if (req.body[field] !== undefined) {
                    user[field] = req.body[field];
                }
            });

            // ================= DELETE OLD IMAGE =================
            if (req.file) {
                if (user.photoUrl && user.photoUrl.includes("amazonaws.com")) {
                    const oldKey = user.photoUrl.split(".amazonaws.com/")[1];

                    if (oldKey) {
                        await s3.send(
                            new DeleteObjectCommand({
                                Bucket: process.env.AWS_BUCKET_NAME,
                                Key: oldKey,
                            })
                        );
                    }
                }

                // Save new image
                user.photoUrl = req.file.location;
            }

            await user.save();

            res.status(200).json({
                success: true,
                message: `${user.firstName}, profile updated successfully`,
                user,
            });
        } catch (err) {
            next(err);
        }
    }
);


/* ================= UPDATE PASSWORD ================= */
profileRouter.patch("/profile/password", userAuth, async (req, res, next) => {
    try {
        const password = req.body?.password;

        if (!password) {
            throw new Error("Password required");
        }

        if (!validator.isStrongPassword(password)) {
            throw new Error("Weak password");
        }

        const hashPassword = await req.user.getHash(password);

        await User.findByIdAndUpdate(
            req.user._id,
            { password: hashPassword },
            { runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (err) {
        next(err);
    }
});

/* ================= TARGET USER ================= */
profileRouter.get("/profile/targetUser/:id", userAuth, async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select(
            "firstName lastName photoUrl"
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "Something went wrong" });
    }
});

module.exports = profileRouter;

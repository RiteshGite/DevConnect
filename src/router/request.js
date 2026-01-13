const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const requestRouter = express.Router();

requestRouter.post(
    "/request/send/:status/:toUserId",
    userAuth,
    async (req, res, next) => {
        try {
            const { status, toUserId } = req.params;
            const fromUserId = req.user._id;
            
            // 1️⃣ Prevent self request
            if (fromUserId.toString() === toUserId) {
                return res.status(400).json({
                    success: false,
                    message: "You cannot send a request to yourself"
                });
            }

            // 2️⃣ Validate status
            const allowedStatus = ["interested", "ignored"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid status type: ${status}`
                });
            }

            // 3️⃣ Check if target user exists
            const toUserExists = await User.findById(toUserId);
            if (!toUserExists) {
                return res.status(404).json({
                    success: false,
                    message: "Target user does not exist"
                });
            }

            // 4️⃣ Check existing requests (both directions)
            const existingRequest = await ConnectionRequest.findOne({
                $or: [
                    { fromUserId, toUserId },
                    { fromUserId: toUserId, toUserId: fromUserId }
                ]
            });

            if (existingRequest) {
                return res.status(400).json({
                    success: false,
                    message: "Connection request already exists"
                });
            }

            // 5️⃣ Create request
            const request = await ConnectionRequest.create({
                fromUserId,
                toUserId,
                status
            });

            const action = (status) =>
                status === "interested" 
                ? `${req.user?.firstName} interested in ${toUserExists.firstName}'s profile` 
                : `${req.user?.firstName} ignored ${toUserExists.firstName}'s profile`

            console.log("I am here");
            res.status(201).json({
                success: true,
                message: action(status),
                data: request
            });
        } catch (err) {
            next(err);
        }
    }
);

module.exports = requestRouter;

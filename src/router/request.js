const { userAuth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const express = require("express");

const requestRouter = express.Router();

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res, next) => {
    const { status, toUserId } = req.params;
    const fromUserId = req.user?._id;
    try {
        const data = await connectionRequest.create({
            toUserId, fromUserId, status
        })

        console.log(data);

        res.status(201).json({
            success: true,
            message: "Request sent successfully"
        }) 
    } catch (err) {
        next(err);
    }
});

module.exports = requestRouter;
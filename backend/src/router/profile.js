const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const User = require("../models/user");
const { validateProfileEdit } = require("../utils/validation");
const validator = require("validator");

profileRouter.get("/profile/view", userAuth, async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).send({
            success: true,
            user: user
        })
    } catch (err) {
        next(err);
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res, next) => {
    try {
        if (!validateProfileEdit(req.body)) {
            throw new Error("Invalid Update");
        }
        const loggedInUser = req.user;
        const before = { ...loggedInUser.toObject() };

        Object.keys(req.body).forEach(field => {
            loggedInUser[field] = req.body[field];
        })
 
        await loggedInUser.save();

        res.status(200).json({
            success: true,
            message: `${loggedInUser.firstName}, your profile updated successfully`,
            before: before,
            after: loggedInUser
        })
    } catch (err) {
        next(err);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res, next) => {
    try {
        const password = req.body?.password;
        if(!password) {
            throw new Error("password required");
        }
        if (!validator.isStrongPassword(password)) {
            throw new Error("weak password");
        }
        const hashPassword = await req.user?.getHash(password);
        await User.findByIdAndUpdate(
            req.user?._id, { password: hashPassword }, { runValidators: true }
        );
        res.status(200).json({
            success: true,
            message: "password updated"
        })
    } catch (err) {
        next(err);
    }
})

module.exports = profileRouter;

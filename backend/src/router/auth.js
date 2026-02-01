const User = require("../models/user");
const { validateSignUpData } = require("../utils/validation");
const validator = require('validator');
const bcrypt = require('bcrypt');
const { BCRYPT_SALT_ROUNDS } = require("../utils/constants");

const express = require("express");
const authRouter = express.Router();

const isProd = process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    secure: true,             
    maxAge: 8 * 60 * 60 * 1000,  // 8 hours
    path: "/",
};

authRouter.post("/signup", async (req, res, next) => {
    const { firstName, lastName, emailId, password, age, gender, photoUrl, about, skills } = req.body;
    try {
        validateSignUpData({
            firstName, lastName, emailId, password
        });
        const passwordHash = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            age,
            gender,
            photoUrl,
            about,
            skills
        });
        const newUser = await user.save();

        const token = await user.getJwt();
        res.cookie("token", token, {
            ...cookieOptions,
        });

        res.status(201).json({
            success: true,
            message: "Registration Successful",
            user: newUser
        })
    } catch (err) {
        next(err);
    }
})

authRouter.post("/login", async (req, res, next) => {
    const { emailId, password } = req.body;
    try {
        if (!emailId || !password) {
            throw new Error("Field is Empty");
        }
        if (!validator.isEmail(emailId)) {
            throw new Error("Invalid Email");
        }
        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.isPasswordValid(password);
        if (!isPasswordValid) {
            throw new Error("Invalid Credentials");
        } else {
            const token = await user.getJwt();
            res.cookie("token", token, {
                ...cookieOptions
            });
            res.status(200).json({
                success: true,
                message: "Login Successful",
                user: user
            })
        }
    } catch (err) {
        next(err);
    }
})

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, { 
        ...cookieOptions,
        maxAge: 0
    });
    res.status(200).json({
        success: true,
        message: "Logout Successful"
    })
})

module.exports = authRouter;


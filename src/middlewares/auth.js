const jwt = require("jsonwebtoken");
const { errorHandler } = require("./errorHandler");
const User = require("../models/user");
const express = require("express");

const app = express();

const userAuth = async (req, res, next) => {
    const token = req.cookies?.token;

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "Authorization required. Please Log in."
        })
    }

    try {
        const decodedObj = await jwt.verify(token, "DEV@Tinder$2811");

        if(!decodedObj) {
            return res.status(401).json({
                success: false,
                message: "No data Exist in token"
            })
        }
        
        const user = await User.findById(decodedObj.userId);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "user not found. please sign up"
            })
        }
        req.user = user;
        next();

    } catch(err) {
        next(err);
    }
}

app.use(errorHandler);


module.exports = { userAuth };

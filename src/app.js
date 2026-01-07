const express = require("express");
const { connectDb } = require("./config/db");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require('validator');
const { errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cookieParser());

// post the user data 
app.post("/signup", async (req, res, next) => {
    const { firstName, lastName, emailId, password, age, gender, photoUrl, about, skills } = req.body;
    try {
        validateSignUpData({
            firstName, lastName, emailId, password
        });
        const passwordHash = await bcrypt.hash(password, 10);
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
        await user.save();
        res.status(201).json({
            success: true,
            message: "Registration Successful"
        })
    } catch(err) {
        next(err);
    }
})

// login api
app.post("/login", async (req, res, next) => {
    const { emailId, password } = req.body;
    try {
        if(!emailId || !password) {
            throw new Error("Field is Empty");
        }
        if(!validator.isEmail(emailId)) {
            throw new Error("Invalid Email");
        }
        const user = await User.findOne({emailId});
        if(!user) {
            throw new Error("Invalid Credentials");
        }
        const isValidPass = await bcrypt.compare(password, user.password);
        if(!isValidPass) {
            throw new Error("Invalid Credentials");
        } else {
            const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$2811");
            console.log("Token = ", token);
            res.cookie("token", token);
            res.status(201).json({
                success: true,
                message: "Login Successful",
            })
        }
    } catch (err) {
        next(err);
    }
})

app.get("/profile", async (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required. Please log in."
        })
    } 
    try {
        const decodedMessage = await jwt.verify(token, "DEV@Tinder$2811");
        console.log(decodedMessage);
        const user = await User.findById(decodedMessage._id);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "Please Sign Up"
            })
        }
        res.status(201).json({
            success: true,
            user: user
        })
    } catch (err) {
        next(err);
    }
})

//  get the user by email id
app.get("/user", async (req, res, next) => {
    const email = req.body?.emailId;
    try {
        const isEmailValid = validator.isEmail(email);
        if (!isEmailValid) {
            throw new Error("Invalid Email");
        }
        const user = await User.findOne({emailId: email});
        if (!user) {
            throw new Error("User Not Found")
        } else {
            res.status(200).json({
                success: true,
                message: "User Found",
                User: user
            })
        }
    } catch(err) {
        next(err);
    }
})

// Feed API - get all the users from the database
app.get("/feed", async (req, res, next) => {
    try {
        const users = await User.find({});
        if(!users.length) {
            throw new Error("Users Not Found");
        } else {
            res.status(200).json({
                success: true,
                users: users
            })
        }
    } catch (err) {
        next(err);
    }
})

// delete User
app.delete("/user/:userId", async (req, res, next) => {
    const { userId } = req.params;
    try {
        const user = await User.findByIdAndDelete(userId);
        if(!user) {
            throw new Error("User not Found");
        } else {
            res.status(200).json({
                success: true,
                message: "User Deleted Successfully",
                user: user
            })
        }
    } catch (err) {
        next(err);
    }
})

// Update user data
app.patch("/user/:userId", async (req, res, next) => {
    const data = req.body;
    const userId = req.params?.userId;

    try {
        const ALLOWED_UPDATES = [
            "gender", "age", "photoUrl", "about", "skills"
        ]
        const isUpdateAllowed = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));
        if (!isUpdateAllowed) {
            throw new Error("Update Not Allowed");
        }

        const oldUser = await User.findByIdAndUpdate(userId, data, {
            new:false,
            runValidators: true
        });
        if(!oldUser) {
            throw new Error("User not Found");
        } else {
            const newUser = await User.findById(userId);
            res.json({
                success: true,
                message: "User Updated Successfully",
                before: oldUser,
                after: newUser
            })
        }
    } catch (err) {
        next(err);
    }
})

// error handler middleware
app.use(errorHandler);

connectDb()
    .then(() => {
        app.listen(7777, () => {
            console.log("server is listening on port 1023");
        });
    })
    .catch((err) => {
        console.log("Error is occured");
    })


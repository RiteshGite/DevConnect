const express = require("express");
const { connectDb } = require("./config/db");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const validator = require('validator');
const { errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth");

const app = express();

app.use(express.json());
app.use(cookieParser());

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
        const isPasswordValid = await user.isPasswordValid(password);
        if(!isPasswordValid) {
            throw new Error("Invalid Credentials");
        } else {
            const token = await user.getJwt();
            res.cookie("token", token, {
                expires: new Date(Date.now() + 8 * 3600000),
                httpOnly: true
            });
            res.status(201).json({
                success: true,
                message: "Login Successful",
            })
        }
    } catch (err) {
        next(err);
    }
})

app.get("/profile", userAuth, async (req, res, next) => {
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


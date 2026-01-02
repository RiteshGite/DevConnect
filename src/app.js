const express = require("express");
const User = require("./models/user")

const app = express();

const { connectDb } = require("./config/db");

app.use(express.json());

// post the user data 
app.post("/signup", async (req, res) => {

    const user = new User(req.body);

    try {
        await user.save();
        res.send("user added successfully");
    } catch(err) {
        res.status(400).send("Error saving the user : " + err);
    }
})

//  get the user by email id
app.get("/user", async (req, res) => {
    const { emailId } = req.body;
    try {
        const user = await User.findOne({emailId: emailId});
        if (!user) {
            res.send("User not found");
        } else {
            res.send(user);
        }
    } catch(err) {
        res.status(400).send("Something went wrong");
    }
})

// Feed API - get all the users from the database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        if(!users.length) {
            res.send("No users found");
        } else {
            res.send(users);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

connectDb()
    .then(() => {
        app.listen(7777, () => {
            console.log("server is listening on port 1023");
        });
    })
    .catch((err) => {
        console.log("Error is occured");
    })


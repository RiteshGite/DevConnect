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
    const email = req.body.emailId;
    try {
        const user = await User.findOne({emailId: email});
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

// delete User
app.delete("/user", async (req, res) => {
    const id = req.body.userId;
    try {
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            res.send("User not found");
        } else {
            res.send("User deleted successfully\n" + user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

// Update user data
app.patch("/user", async (req, res) => {
    const data = req.body;
    try {
        const oldUser = await User.findByIdAndUpdate(data.userId, data, {
            new:false,
            runValidators: true
        });
        if(!oldUser) {
            res.status(404).send("User Not Found");
        } else {
            const newUser = await User.findById(data.userId);
            res.json({
                message: "User Updated Successfully",
                before: oldUser,
                after: newUser
            })
        }
    } catch (err) {
        res.status(500).send("Error: " + err);
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


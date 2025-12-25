const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

// “In Express, app.use is for middleware with prefix matching, while app.all is for defining a route that handles all HTTP methods with exact matching.”

// Authentication -> Checking Identity
// Authorization -> Checking Permission

// Authorization Middleware
app.use("/Admin", adminAuth);

app.post("/user/login", (req, res) => {
    res.send("Login Form");
})

app.get("/user/profile", userAuth, (req, res) => {
    res.send("this is user profile");
})

app.get("/Admin/getAllData", (req, res, next) => {
    // Logic for getting the data from database
    res.send({
        user1: "Ritesh Gite",
        user2: "Mahesh Gite", 
        user3: "Siddhesh Gite",
        user4: "Avinash Gawai"
    })})

app.get("/Admin/deleteUser", (req, res, next) => {
    // Logic for deleting the user from the database
    res.send("User is deleted from the database");
})

app.listen(1023, () => {
    console.log("server is listening");
})
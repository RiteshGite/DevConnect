const express = require("express");

const app = express();


// app.use() is used for middleware and matches only the route path for all HTTP methods, whereas app.get(), app.post(), etc.match both the HTTP method and the route and are used for handling specific API requests.

//Postman is an API development and testing tool used to send HTTP requests, test backend APIs, debug responses, handle authentication, and validate API behavior without building a frontend.


// app.use((req, res) => {
//     res.send("use use use");
// })

// This will only handle GET call to /user
app.get("/user", (req, res) => {
    // getting data from database
    res.send({
        name: "Ritesh Gite",
        age: "20",
        Gender: "male",
        email: "riteshgite2005@gmail.com"
    })
})

app.post("/user", (req, res) => {
    // adding data into the database
    res.send("Data added successfully into the database");
})

app.put("/user", (req, res) => {
    // updating the user (full replace/update)
    res.send("user data updated successfully");
})

app.patch("/user", (req, res) => {
    // updating the user information (partial update)
    res.send("updated the user information successfully")
})

app.delete("/user", (req, res) => {
    // deleting the information from the database
    res.send("deleted the user from the database");
})

// This will match all the http method api calls to /test
app.use("/test", (req, res) => {
    res.send("test test test");
})

app.get(/^\/ab?c$/, (req, res) => {
    res.send("you can write, abc or ac");
})

app.get(/^\/ab+c$/, (req, res) => {
    res.send("write b one time or multiple time")
})

app.get(/^\/ab(cde)?f$/, (req, res) => {
    res.send("cde is optional")
})

app.get(/^\/ab(cde)*f$/, (req, res) => {
    res.send("write cde 0 times or multiple times");
})

app.get(/^\/ab.*c$/, (req, res) => {
    console.log(req.url);
    res.send("You can add anything in between b and c", req.url);
})

app.get("/profile/:userId/:connectionId", (req, res) => {
    console.log(req.params);
    res.send(req.params);
})

app.get("/profile", (req, res) => {
    console.log(req.query);
    res.send(req.query);
})

app.get(/ab(cde)+f/, (req, res) => {
    res.send("write cde 1 time or multiple times");
})

app.get(/ab*c/, (req, res) => {
    res.send("regex pattern");
})

app.get(/ab.c/, (req, res) => {
    res.send("write any one character in between b and c");
})

app.listen(1023, (req, res) => {
    console.log("server listening");
})


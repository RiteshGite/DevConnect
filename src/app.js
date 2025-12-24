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

app.listen(1023, (req, res) => {
    console.log("server listening");
})


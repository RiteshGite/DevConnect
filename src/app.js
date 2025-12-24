const express = require("express");

const app = express();


app.use("/hello", (req, res) => {
    //request  handler
    res.send("hello helllo hello");
})

app.listen(1023, (req, res) => {
    console.log("server listening");
})


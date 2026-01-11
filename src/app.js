const express = require("express");
const { connectDb } = require("./config/db");
const { errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

app.use(errorHandler);

connectDb()
    .then(() => {
        app.listen(7777, () => {
            console.log("server is listening on port 7777");
        });
    })
    .catch((err) => {
        console.log("Error is occured");
    })


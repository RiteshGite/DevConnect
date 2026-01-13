const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDb } = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

app.use(errorHandler);

connectDb()
    .then(() => {
        app.listen(7777, () => {
            console.log("Server running on port 7777");
        });
    })
    .catch((err) => {
        console.error("DB connection failed", err);
    });

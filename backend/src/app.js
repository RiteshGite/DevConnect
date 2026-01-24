const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDb } = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
require('dotenv').config()

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");
const cors = require("cors");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

app.use(errorHandler);

connectDb()
    .then(() => {
        app.listen(process.env.PORT || "7777");
    })
    .catch((err) => { });

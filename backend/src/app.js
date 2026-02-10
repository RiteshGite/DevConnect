require('dotenv').config()

const express = require("express");
const http = require("http");
const cookieParser = require("cookie-parser");

const { connectDb } = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const initializeSocket = require("./utils/socket");

const authRouter = require("./router/auth");
const profileRouter = require("./router/profile");
const requestRouter = require("./router/request");
const userRouter = require("./router/user");
const paymentRouter = require("./router/payment");
const paymentWebhookHandler = require("./router/paymentWebhookHandler");
const chatRouter = require("./router/chat");
const aiRouter = require("./router/ai");

const cors = require("cors");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://dev-tinder-neon-pi.vercel.app",
    "http://35.171.47.132",
    "http://developerstinder.duckdns.org"
]

app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.post(
    "/payment/webhook",
    express.raw({ type: "application/json" }),
    paymentWebhookHandler
);

app.use(cookieParser());
app.use(express.json());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", paymentRouter);
app.use("/", chatRouter);
app.use("/", aiRouter);

app.use(errorHandler);

const PORT = process.env.PORT || "7777";

const server = http.createServer(app);

initializeSocket(server);

connectDb() 
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    })
    .catch((err) => { });

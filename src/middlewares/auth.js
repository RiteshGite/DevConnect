const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authorization required"
            });
        }

        const decoded = jwt.verify(token, "DEV@Tinder$2811");

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        console.log("next is defined");
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = { userAuth };

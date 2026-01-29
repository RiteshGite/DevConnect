const { DEFAULT_PROFILE_PHOTO, JWT_TOKEN_EXPIRESIN, BCRYPT_SALT_ROUNDS } = require("../utils/constants");

const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name Required"],
        minLength: [3, "First name must be atleast 3 characters"],
        maxLength: [20, "First name must be less than 20 characters"],
        trim: true
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20,
        trim: true
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        lowercase: true,
    },
    age: {
        type: Number,
        min: 18,
        max: 150
    },
    photoUrl: {
        type: String,
        default: DEFAULT_PROFILE_PHOTO,
        validate: {
            validator: url => validator.isURL(url),
            message: "Invalid Photo URL"
        }
    },
    about: {
        type: String,
        default: "This is default about of the user!",
        maxLength: 1000
    },
    skills: {
        type: [{
            type: String,
            maxLength: 20,
            trim: true
        }],
        validate: {
            validator: arr => arr.length <= 20,
            message: "Maximum 20 skills allowed"
        }
    }
}, {
    timestamps: true
});

userSchema.methods.getJwt = async function () {
    const user = this;
    const token = await jwt.sign(
        { userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: JWT_TOKEN_EXPIRESIN }
    );
    return token;
}

userSchema.methods.getHash = async function (userInputPassword) {
    const passwordHash = await bcrypt.hash(userInputPassword, BCRYPT_SALT_ROUNDS);
    return passwordHash;
};

userSchema.methods.isPasswordValid = async function (password) {
    const isValidPass = await bcrypt.compare(password, this.password);
    return isValidPass;
}

const User = mongoose.model("User", userSchema);

module.exports = User;

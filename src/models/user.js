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
            if(!validator.isEmail(email)) {
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
        // enum: ["male", "female", "others"],
        lowercase: true,

        validate(value) {
            if(!["male", "female", "others"].includes(value)) {
                throw new Error("Gender Data is not Valid");
            }
        }
    },
    age: {
        type: Number,
        min: 18, 
        max: 150
    },
    photoUrl: {
        type: String,
        default: "https://imgs.search.brave.com/PixY8_zgl8cU1m2y47bf0V-2jOluOmEHOR4564ScsUA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw",
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
       { userId: user._id }, "DEV@Tinder$2811", { expiresIn: "1d" }
    );
    return token;
}

userSchema.methods.isPasswordValid = async function (password) {
    const isValidPass = await bcrypt.compare(password, this.password);
    return isValidPass;
}

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true
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
        default: "https://imgs.search.brave.com/PixY8_zgl8cU1m2y47bf0V-2jOluOmEHOR4564ScsUA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw"
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

const User = mongoose.model("User", userSchema);

module.exports = User;

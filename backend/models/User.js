const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }]
});

module.exports = mongoose.model("User", userSchema);
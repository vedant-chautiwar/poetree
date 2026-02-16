const mongoose = require("mongoose");

const poemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Poem", poemSchema);
const Comment = require("../models/Comment");

exports.addComment = async (req, res) => {
    const comment = new Comment({
        text: req.body.text,
        poem: req.body.poem,
        user: req.userId
    });
    await comment.save();
    res.json(comment);
};

exports.getComments = async (req, res) => {
    const comments = await Comment.find({ poem: req.params.poemId }).populate("user", "username");
    res.json(comments);
};
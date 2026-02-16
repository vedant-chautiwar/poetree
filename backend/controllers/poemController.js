const Poem = require("../models/Poem");

exports.createPoem = async (req, res) => {
    const poem = new Poem({
        title: req.body.title,
        content: req.body.content,
        author: req.userId
    });
    await poem.save();
    res.json(poem);
};

exports.getPoem = async (req, res) => {
    const poems = await Poem.find().populate("author", "username").sort({ createdAt: -1 });
    res.json(poems);
};

exports.likePoem = async (req, res) => {
    const poem = await Poem.findById(req.params.id);

    if (poem.likes.includes(req.userId)) {
        poem.likes.pull(req.userId);
    } else {
        poem.likes.push(req.userId);
    }
    await poem.save();
    res.json(poem);
};
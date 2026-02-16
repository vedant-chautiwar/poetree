const User = require("../models/User");
const Poem = require("../models/Poem");

exports.follow = async (req, res) => {
    const me = await User.findById(req.userId);
    const other = await User.findById(req.params.id);

    if (me.following.includes(other._id)) {
        me.following.pull(other._id);
        other.followers.pull(me._id);
    } else {
        me.following.push(other._id);
        other.followers.push(me._id);
    }
    await me.save();
    await other.save();
    res.json({ followers: other.followers.length });
}

exports.search = async (req, res) => {
    const users = await User.find({
        username: { $regex: req.params.username, $options: "i" }
    }).select("username");
    res.json(users);
}

exports.profile = async (req, res) => {
    const user = await User.findById(req.params.id).select("-password").populate("followers following", "username");
    const poems = await Poem.find({ author: req.params.id });
    res.json({ user, poems });
};

const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        ...req.body,
        password: hash
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.status(201).json({ token });
};
exports.login = async (req, res) => {
    try{ 
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ message: "user not found" });

    const ok = await bcrypt.compare(req.body.password, user.password);
    if (!ok) return res.status(400).json({ message: "invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ token });
    } catch(err){
        res.status(500).json({message: "server error"});
    }
};
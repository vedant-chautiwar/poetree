const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: "no token" });

    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        res.status(400).json("invalid token");
    }
};

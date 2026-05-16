require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const poemRoutes = require("./routes/poemRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const cors = require("cors");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error(`CORS blocked origin: ${origin}`));
    },
    credentials: true,
}));
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({ success: true, message: "Poetree API running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/poems", poemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`server running on ${PORT}`);
        });
    } catch (err) {
        console.error(`Server not started because MongoDB is unavailable: ${err.message}`);
        process.exit(1);
    }
};

startServer();

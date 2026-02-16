const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const poemRoutes = require("./routes/poemRoutes");
const userRoutes = require("./routes/userRoutes");
const commentRoutes = require("./routes/commentRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors({
    app.use(
  cors({
    origin: "https://poetree-1.onrender.com",
    credentials: true,
  })
);
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/poems", poemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
})
// 1. CRUCIAL: DNS configuration must be at the very top
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middleware/authMiddleware");

const app = express();

// 2. Connect Database
connectDB();

// 3. Middleware
app.use(cors());
app.use(express.json());

// 4. Routes
app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Hostelhub Backend Running...");
});

// Protected Route
app.get("/api/profile", verifyToken, (req, res) => {
    res.json({
        success: true,
        message: "Protected Route Accessed",
        user: req.user
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
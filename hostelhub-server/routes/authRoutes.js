const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    resetPassword
} = require("../controllers/authController");


// ======================================================
// AUTHENTICATION ROUTES
// ======================================================

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);


// ======================================================
// PASSWORD RESET ROUTE
// ======================================================

// Reset Password (Without OTP)
router.post("/reset-password", resetPassword);


module.exports = router;
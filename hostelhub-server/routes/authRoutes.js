const express = require("express");

const router = express.Router();

const {
    registerUser,
    loginUser,
    sendRegisterOtp,
    verifyRegisterOtp,
    sendForgotPasswordOtp,
    verifyForgotPasswordOtp,
    resetPassword
} = require("../controllers/authController");


// ======================================================
// REGISTRATION OTP ROUTES
// ======================================================

// Send Registration OTP
router.post("/send-register-otp", sendRegisterOtp);

// Verify Registration OTP
router.post("/verify-register-otp", verifyRegisterOtp);


// ======================================================
// FORGOT PASSWORD ROUTES
// ======================================================

// Send Forgot Password OTP
router.post(
    "/send-forgot-password-otp",
    sendForgotPasswordOtp
);

// Verify Forgot Password OTP
router.post(
    "/verify-forgot-password-otp",
    verifyForgotPasswordOtp
);

// Reset Password
router.post(
    "/reset-password",
    resetPassword
);


// ======================================================
// AUTHENTICATION ROUTES
// ======================================================

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);


module.exports = router;
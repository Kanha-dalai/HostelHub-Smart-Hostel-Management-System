const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// OTP Model
const OtpVerification = require("../models/OtpVerification");

// Email Transporter
const transporter = require("../config/emailTransporter");


// ======================================================
// SEND REGISTRATION OTP
// ======================================================

const sendRegisterOtp = async (req, res) => {

    try {

        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Check if email is already registered
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already registered"
            });
        }

        // Generate random 6-digit OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // Delete only previous registration OTPs for this email
        await OtpVerification.deleteMany({
            email: normalizedEmail,
            purpose: "registration"
        });

        // OTP expires after 10 minutes
        const expiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );

        // Save registration OTP in MongoDB
        await OtpVerification.create({
            email: normalizedEmail,
            otp: otp,
            purpose: "registration",
            expiresAt: expiresAt,
            isVerified: false
        });

        // Send OTP through email
        await transporter.sendMail({

            from: `"HostelHub" <${process.env.EMAIL_USER}>`,

            to: normalizedEmail,

            subject: "HostelHub Registration OTP",

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 30px;
                    background: #f8fafc;
                    border-radius: 12px;
                ">

                    <h1 style="
                        color: #2563eb;
                        text-align: center;
                    ">
                        🏠 HostelHub
                    </h1>

                    <h2 style="
                        color: #1e293b;
                        text-align: center;
                    ">
                        Email Verification
                    </h2>

                    <p style="
                        color: #475569;
                        font-size: 16px;
                    ">
                        Hello,
                    </p>

                    <p style="
                        color: #475569;
                        font-size: 16px;
                    ">
                        Use the following OTP to verify your email
                        address and complete your HostelHub registration.
                    </p>

                    <div style="
                        background: #dbeafe;
                        padding: 20px;
                        margin: 25px 0;
                        border-radius: 10px;
                        text-align: center;
                    ">

                        <p style="
                            margin: 0 0 10px;
                            color: #475569;
                        ">
                            Your verification OTP is:
                        </p>

                        <h1 style="
                            color: #1d4ed8;
                            letter-spacing: 8px;
                            margin: 0;
                        ">
                            ${otp}
                        </h1>

                    </div>

                    <p style="
                        color: #64748b;
                        font-size: 14px;
                    ">
                        This OTP is valid for 10 minutes.
                    </p>

                    <p style="
                        color: #64748b;
                        font-size: 14px;
                    ">
                        If you did not request this OTP,
                        please ignore this email.
                    </p>

                    <hr style="
                        border: none;
                        border-top: 1px solid #e2e8f0;
                        margin: 25px 0;
                    ">

                    <p style="
                        text-align: center;
                        color: #94a3b8;
                        font-size: 13px;
                    ">
                        HostelHub – Smart Hostel Management System
                    </p>

                </div>
            `
        });

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully to your email"
        });

    } catch (error) {

        console.error("Send Registration OTP Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ======================================================
// VERIFY REGISTRATION OTP
// ======================================================

const verifyRegisterOtp = async (req, res) => {

    try {

        const { email, otp } = req.body;

        // Check required fields
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Find only registration OTP
        const otpRecord = await OtpVerification.findOne({
            email: normalizedEmail,
            otp: otp.toString(),
            purpose: "registration"
        });

        // Check whether OTP exists
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Check whether OTP has expired
        if (otpRecord.expiresAt < new Date()) {

            await OtpVerification.deleteOne({
                _id: otpRecord._id
            });

            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new OTP."
            });
        }

        // Mark registration OTP as verified
        otpRecord.isVerified = true;

        await otpRecord.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        });

    } catch (error) {

        console.error("Verify Registration OTP Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ======================================================
// SEND FORGOT PASSWORD OTP
// ======================================================

const sendForgotPasswordOtp = async (req, res) => {

    try {

        const { email } = req.body;

        // Check if email is provided
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Check whether user exists
        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found with this email address"
            });
        }

        // Generate random 6-digit OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // Delete only previous forgot-password OTPs
        await OtpVerification.deleteMany({
            email: normalizedEmail,
            purpose: "forgot-password"
        });

        // OTP expires after 10 minutes
        const expiresAt = new Date(
            Date.now() + 10 * 60 * 1000
        );

        // Save forgot-password OTP in MongoDB
        await OtpVerification.create({
            email: normalizedEmail,
            otp: otp,
            purpose: "forgot-password",
            expiresAt: expiresAt,
            isVerified: false
        });

        // Send OTP email
        await transporter.sendMail({

            from: `"HostelHub" <${process.env.EMAIL_USER}>`,

            to: normalizedEmail,

            subject: "HostelHub Password Reset OTP",

            html: `
                <div style="
                    font-family: Arial, sans-serif;
                    max-width: 600px;
                    margin: auto;
                    padding: 30px;
                    background: #f8fafc;
                    border-radius: 12px;
                ">

                    <h1 style="
                        color: #2563eb;
                        text-align: center;
                    ">
                        🏠 HostelHub
                    </h1>

                    <h2 style="
                        color: #1e293b;
                        text-align: center;
                    ">
                        Password Reset Request
                    </h2>

                    <p style="
                        color: #475569;
                        font-size: 16px;
                    ">
                        Hello ${user.fullName},
                    </p>

                    <p style="
                        color: #475569;
                        font-size: 16px;
                    ">
                        We received a request to reset the password
                        for your HostelHub account.
                    </p>

                    <p style="
                        color: #475569;
                        font-size: 16px;
                    ">
                        Use the following OTP to verify your identity:
                    </p>

                    <div style="
                        background: #dbeafe;
                        padding: 20px;
                        margin: 25px 0;
                        border-radius: 10px;
                        text-align: center;
                    ">

                        <p style="
                            margin: 0 0 10px;
                            color: #475569;
                        ">
                            Your password reset OTP is:
                        </p>

                        <h1 style="
                            color: #1d4ed8;
                            letter-spacing: 8px;
                            margin: 0;
                        ">
                            ${otp}
                        </h1>

                    </div>

                    <p style="
                        color: #64748b;
                        font-size: 14px;
                    ">
                        This OTP is valid for 10 minutes.
                    </p>

                    <p style="
                        color: #64748b;
                        font-size: 14px;
                    ">
                        If you did not request a password reset,
                        please ignore this email. Your password
                        will remain unchanged.
                    </p>

                    <hr style="
                        border: none;
                        border-top: 1px solid #e2e8f0;
                        margin: 25px 0;
                    ">

                    <p style="
                        text-align: center;
                        color: #94a3b8;
                        font-size: 13px;
                    ">
                        HostelHub – Smart Hostel Management System
                    </p>

                </div>
            `
        });

        return res.status(200).json({
            success: true,
            message: "Password reset OTP sent successfully to your email"
        });

    } catch (error) {

        console.error("Send Forgot Password OTP Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ======================================================
// VERIFY FORGOT PASSWORD OTP
// ======================================================

const verifyForgotPasswordOtp = async (req, res) => {

    try {

        const { email, otp } = req.body;

        // Check required fields
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: "Email and OTP are required"
            });
        }

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Check whether user exists
        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "No account found with this email address"
            });
        }

        // Find only forgot-password OTP
        const otpRecord = await OtpVerification.findOne({
            email: normalizedEmail,
            otp: otp.toString(),
            purpose: "forgot-password"
        });

        // Check whether OTP exists
        if (!otpRecord) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Check whether OTP has expired
        if (otpRecord.expiresAt < new Date()) {

            await OtpVerification.deleteOne({
                _id: otpRecord._id
            });

            return res.status(400).json({
                success: false,
                message: "OTP has expired. Please request a new OTP."
            });
        }

        // Mark forgot-password OTP as verified
        otpRecord.isVerified = true;

        await otpRecord.save();

        return res.status(200).json({
            success: true,
            message: "OTP verified successfully. You can now reset your password."
        });

    } catch (error) {

        console.error("Verify Forgot Password OTP Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ======================================================
// RESET PASSWORD
// ======================================================

const resetPassword = async (req, res) => {

    try {

        const {
            email,
            newPassword,
            confirmPassword
        } = req.body;

        // Check required fields
        if (!email || !newPassword || !confirmPassword) {

            return res.status(400).json({
                success: false,
                message: "Email, new password and confirm password are required"
            });

        }

        // Check whether passwords match
        if (newPassword !== confirmPassword) {

            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });

        }

        // Basic password-length validation
        if (newPassword.length < 6) {

            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long"
            });

        }

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Check whether user exists
        const user = await User.findOne({
            email: normalizedEmail
        });

        if (!user) {

            return res.status(404).json({
                success: false,
                message: "No account found with this email address"
            });

        }

        // Check whether forgot-password OTP was verified
        const verifiedOtp = await OtpVerification.findOne({

            email: normalizedEmail,

            purpose: "forgot-password",

            isVerified: true,

            expiresAt: {
                $gt: new Date()
            }

        });

        if (!verifiedOtp) {

            return res.status(400).json({
                success: false,
                message: "Please verify your OTP before resetting your password"
            });

        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        // Update user's password
        user.password = hashedPassword;

        await user.save();

        // Delete only forgot-password OTP records
        await OtpVerification.deleteMany({
            email: normalizedEmail,
            purpose: "forgot-password"
        });

        return res.status(200).json({
            success: true,
            message: "Password reset successfully. You can now login with your new password."
        });

    } catch (error) {

        console.error("Reset Password Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ======================================================
// REGISTER USER
// ======================================================

const registerUser = async (req, res) => {

    try {

        const {
            fullName,
            email,
            phone,
            role,
            rollNumber,
            adminId,
            course,
            hostel,
            password
        } = req.body;

        // Check required fields
        if (!fullName || !email || !password || !role) {

            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });

        }

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Check whether email is already registered
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {

            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });

        }

        // Check whether registration OTP was verified
        const verifiedOtp = await OtpVerification.findOne({

            email: normalizedEmail,

            purpose: "registration",

            isVerified: true,

            expiresAt: {
                $gt: new Date()
            }

        });

        // Stop registration if registration OTP was not verified
        if (!verifiedOtp) {

            return res.status(400).json({
                success: false,
                message: "Please verify your email with OTP before registration"
            });

        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create new user
        const user = new User({

            fullName,

            email: normalizedEmail,

            phone,

            role,

            rollNumber,

            adminId,

            course,

            hostel,

            password: hashedPassword

        });

        // Save user in MongoDB
        await user.save();

        // Delete only registration OTP records
        await OtpVerification.deleteMany({
            email: normalizedEmail,
            purpose: "registration"
        });

        return res.status(201).json({
            success: true,
            message: "Registration Successful"
        });

    } catch (error) {

        console.error("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ======================================================
// LOGIN USER
// ======================================================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });

        }

        // Normalize email
        const normalizedEmail = email.toLowerCase().trim();

        // Find user
        const user = await User.findOne({
            email: normalizedEmail
        });

        // Check whether user exists
        if (!user) {

            return res.status(400).json({
                success: false,
                message: "User not found"
            });

        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });

        }

        // Generate JWT token
        const token = jwt.sign(

            {
                id: user._id,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "1d"
            }

        );

        return res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {

                id: user._id,
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                rollNumber: user.rollNumber,
                adminId: user.adminId,
                course: user.course,
                hostel: user.hostel

            }

        });

    } catch (error) {

        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// ======================================================
// EXPORT CONTROLLERS
// ======================================================

module.exports = {

    registerUser,

    loginUser,

    sendRegisterOtp,

    verifyRegisterOtp,

    sendForgotPasswordOtp,

    verifyForgotPasswordOtp,

    resetPassword

};
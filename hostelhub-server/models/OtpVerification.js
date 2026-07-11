const mongoose = require("mongoose");

const otpVerificationSchema = new mongoose.Schema(
    {

        // User's email address
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },


        // 6-digit OTP
        otp: {
            type: String,
            required: true
        },


        // Purpose of the OTP
        purpose: {
            type: String,
            enum: [
                "registration",
                "forgot-password"
            ],
            required: true
        },


        // Whether OTP has been successfully verified
        isVerified: {
            type: Boolean,
            default: false
        },


        // OTP expiration time
        expiresAt: {
            type: Date,
            required: true
        }

    },
    {
        timestamps: true
    }
);


// Automatically delete expired OTP documents from MongoDB
otpVerificationSchema.index(
    {
        expiresAt: 1
    },
    {
        expireAfterSeconds: 0
    }
);


module.exports = mongoose.model(
    "OtpVerification",
    otpVerificationSchema
);
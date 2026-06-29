const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["student", "admin"],
            default: "student",
            required: true,
        },

        rollNumber: {
            type: String,
            default: null,
        },

        adminId: {
            type: String,
            default: null,
        },

        course: {
            type: String,
            default: "N/A",
        },

        hostel: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register

const registerUser = async (req, res) => {
    try{
        console.log("Request Body:", req.body);

        const fullName = req.body.fullName;
        const email = req.body.email;
        const phone = req.body.phone;
        const role = req.body.role;
        const rollNumber = req.body.rollNumber;
        const adminId = req.body.adminId;
        const course = req.body.course;
        const hostel = req.body.hostel;
        const password = req.body.password;

        console.log("Password:", password);
        
        //Check existing email

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        //Encrypt Password

        console.log(req.body);
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create User

        const user = new User({
            fullName,
            email,
            phone,
            role,
            rollNumber,
            adminId,
            course,
            hostel,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({
            success: true,
            message: "Registration Successfull"
        });
    }
    catch(error){
        console.error("Register Error:",error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ================= Login =================

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check Email
        console.log("Login Request:", req.body);
        const user = await User.findOne({ email });
        console.log("User Found:", user);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        // Compare Password

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            });
        }

        // Generate JWT

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

        res.status(200).json({

            success: true,

            message: "Login Successful",

            token,

            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }

        });

    }
    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports ={
    registerUser,
    loginUser
};
import "./Register.css";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import hostelBg from "../assets/hostel-bg.jpg";

function Register() {

  const [userType, setUserType] = useState("student");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "student",
    rollNumber: "",
    adminId: "",
    course: "",
    hostel: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    //Password Validation
    if(formData.password !== formData.confirmPassword){
      alert("Passwords do not match");
      return;
    }
    try{
      const response = await API.post("/auth/register",{
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        rollNumber:
          formData.role === "student"
          ? formData.rollNumber
          : "",
        adminId:
          formData.role === "admin"
            ? formData.adminId
            : "",
        course:
          formData.role === "student"
            ? formData.course
            : "N/A",

        hostel: formData.hostel,
        password: formData.password
      });
      alert(response.data.message);
      navigate("/login");
    }
    catch(error){
      alert(error.response?.data?.message || "Registration Failed");
    }
  };

  return (

    <div className="register-page">

      {/* ================= LEFT SIDE ================= */}

      <div
        className="left-side"
        style={{
          backgroundImage: `url(${hostelBg})`,
        }}
      >

        <div className="overlay"></div>

        <div className="left-content">

          <div className="logo-section">

            <h1>🏠 HostelHub</h1>

            <p>Smart Hostel Management System</p>

          </div>

          <div className="badge">

            Join the Future of Hostel Management

          </div>

          <div className="hero-content">

            <h2>

              Create Your

              <br />

              <span>Account Here</span>

            </h2>

            <p>

              Register yourself to access hostel facilities,
              apply for leave, submit complaints, view notices,
              and manage your hostel profile with HostelHub.

            </p>

          </div>

          <div className="feature-list">

            <div className="feature-item">
              🛏 Room Information
            </div>

            <div className="feature-item">
              📝 Leave Application
            </div>

            <div className="feature-item">
              🛠 Complaint Tracking
            </div>

            <div className="feature-item">
              📢 Digital Notice Board
            </div>

            <div className="feature-item">
              🔒 Secure Authentication
            </div>

          </div>

        </div>

      </div>

      {/* ================= RIGHT SIDE ================= */}

      <div className="right-side">

        <div className="register-card">

          <h2>Create Account</h2>

          <p className="subtitle">

            Register to continue

          </p>

          <form onSubmit={handleSubmit}>

            {/* ================= USER TYPE ================= */}

            <div className="user-type">

              <label className="user-type-label">

                User Type

              </label>

              <div className="radio-group">

                <label className="radio-option">

                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={userType === "student"}
                    onChange={(e) => {
                      setUserType(e.target.value);
                      setFormData({
                        ...formData,
                        role: e.target.value
                      });
                    }}
                  />

                  <span>Student</span>

                </label>

                <label className="radio-option">

                  <input
                    type="radio"
                    name="userType"
                    value="admin"
                    checked={userType === "admin"}
                    onChange={(e) => {
                      setUserType(e.target.value);
                      setFormData({
                        ...formData,
                        role: e.target.value,
                        course: "N/A"
                      });
                    }}
                  />

                  <span>Admin</span>

                </label>

              </div>

            </div>

            {/* ================= FULL NAME ================= */}

            <label>Full Name</label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
            />

            {/* ================= EMAIL ================= */}

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            {/* ================= PHONE ================= */}

            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
            />

            {/* ================= ROLL / ADMIN ID ================= */}

            <label>

              {userType === "student"
                ? "Roll Number"
                : "Admin ID"}

            </label>

            <input
              type="text"
              name={userType === "student" ? "rollNumber" : "adminId"}
              value={
                userType === "student"
                ? formData.rollNumber
                : formData.adminId
              }
              onChange={handleChange}
              placeholder={
                userType === "student"
                  ? "Enter Roll Number"
                  : "Enter Admin ID"
              }
            />

            {/* ================= COURSE ================= */}

            <label>Course</label>

            {
              userType === "student" ? (

                <select
                  name="course"
                  value={userType === "admin" ? "N/A" : formData.course}
                  disabled={userType === "admin"}
                  onChange={handleChange}
                >
                {
                  userType === "admin"
                  ?
                  <option value="N/A">N/A</option>
                  :
                  <>
                    <option value="">
                      Select Course
                    </option>

                    <option value="MCA">
                      MCA
                    </option>

                    <option value="BCA">
                      BCA
                    </option>

                    <option value="B.Tech">
                      B.Tech
                    </option>

                    <option value="M.Tech">
                      M.Tech
                    </option>
                  </>
                }
                </select>

              ) : (

                <input
                  type="text"
                  value="N/A"
                  readOnly
                />

              )
            }

            {/* ================= HOSTEL ================= */}

            <label>Hostel</label>

            <select
              name="hostel"
              value={formData.hostel}
              onChange={handleChange}
            >

              <option value="">Select Hostel</option>

              <option>Boys Hostel 1</option>

              <option>Boys Hostel 2</option>

              <option>Boys Hostel 3</option>

              <option>Boys Hostel 4</option>

              <option>Boys Hostel 5</option>

              <option>Girls Hostel 1</option>

              <option>Girls Hostel 2</option>

              <option>Girls Hostel 3</option>

              <option>Girls Hostel 4</option>

              <option>Girls Hostel 5</option>

            </select>

            {/* ================= PASSWORD ================= */}

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />

            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
            />

            <button
              type="submit"
              className="register-btn"
            >

              Create Account

            </button>

          </form>

          <p className="login-link">

            Already have an account?

            <Link to="/login">

              Login Here

            </Link>

          </p>
        </div>

      </div>

    </div>

  );

}

export default Register;
import "./Register.css";
import API from "../api/api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import hostelBg from "../assets/hostel-bg.jpg";

function Register() {

  const navigate = useNavigate();

  // Student or Admin
  const [userType, setUserType] = useState("student");

  // OTP states
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  // Loading states
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [registering, setRegistering] = useState(false);

  // Form data
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


  // ======================================================
  // HANDLE INPUT CHANGE
  // ======================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value
    }));

    /*
      If user changes the email after verification,
      the new email must be verified again.
    */
    if (name === "email") {
      setIsEmailVerified(false);
      setOtpSent(false);
      setOtp("");
    }
  };


  // ======================================================
  // HANDLE USER TYPE
  // ======================================================

  const handleUserTypeChange = (e) => {

    const selectedRole = e.target.value;

    setUserType(selectedRole);

    setFormData((previousData) => ({
      ...previousData,

      role: selectedRole,

      rollNumber:
        selectedRole === "student"
          ? previousData.rollNumber
          : "",

      adminId:
        selectedRole === "admin"
          ? previousData.adminId
          : "",

      course:
        selectedRole === "student"
          ? ""
          : "N/A"
    }));
  };


  // ======================================================
  // SEND OTP
  // ======================================================

  const handleSendOtp = async () => {

    // Check email
    if (!formData.email.trim()) {
      alert("Please enter your email address first");
      return;
    }

    try {

      setSendingOtp(true);

      const response = await API.post(
        "/auth/send-register-otp",
        {
          email: formData.email
        }
      );

      alert(response.data.message);

      setOtpSent(true);
      setIsEmailVerified(false);
      setOtp("");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to send OTP"
      );

    } finally {

      setSendingOtp(false);

    }
  };


  // ======================================================
  // VERIFY OTP
  // ======================================================

  const handleVerifyOtp = async () => {

    if (!otp.trim()) {
      alert("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      alert("OTP must be 6 digits");
      return;
    }

    try {

      setVerifyingOtp(true);

      const response = await API.post(
        "/auth/verify-register-otp",
        {
          email: formData.email,
          otp: otp
        }
      );

      alert(response.data.message);

      setIsEmailVerified(true);

    } catch (error) {

      setIsEmailVerified(false);

      alert(
        error.response?.data?.message ||
        "OTP verification failed"
      );

    } finally {

      setVerifyingOtp(false);

    }
  };


  // ======================================================
  // REGISTER USER
  // ======================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Check email verification
    if (!isEmailVerified) {
      alert("Please verify your email with OTP first");
      return;
    }

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setRegistering(true);

      const response = await API.post(
        "/auth/register",
        {
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
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setRegistering(false);

    }
  };


  return (

    <div className="register-page">

      {/* ================= LEFT SIDE ================= */}

      <div
        className="left-side"
        style={{
          backgroundImage: `url(${hostelBg})`
        }}
      >

        <div className="overlay"></div>

        <div className="left-content">

          <div className="logo-section">

            <h1>🏠 HostelHub</h1>

            <p>
              Smart Hostel Management System
            </p>

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
                    onChange={handleUserTypeChange}
                  />

                  <span>Student</span>

                </label>


                <label className="radio-option">

                  <input
                    type="radio"
                    name="userType"
                    value="admin"
                    checked={userType === "admin"}
                    onChange={handleUserTypeChange}
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
              required
            />


            {/* ================= EMAIL + SEND OTP ================= */}

            <label>Email Address</label>

            <div className="email-otp-row">

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={isEmailVerified}
                required
              />

              {!isEmailVerified && (

                <button
                  type="button"
                  className="send-otp-btn"
                  onClick={handleSendOtp}
                  disabled={sendingOtp}
                >

                  {sendingOtp
                    ? "Sending..."
                    : otpSent
                      ? "Resend OTP"
                      : "Send OTP"
                  }

                </button>

              )}

            </div>


            {/* ================= OTP VERIFICATION ================= */}

            {otpSent && !isEmailVerified && (

              <div className="otp-section">

                <label>Enter 6-Digit OTP</label>

                <div className="otp-row">

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength="6"
                    value={otp}
                    onChange={(e) => {

                      const value = e.target.value.replace(
                        /\D/g,
                        ""
                      );

                      setOtp(value);

                    }}
                    placeholder="Enter OTP"
                  />

                  <button
                    type="button"
                    className="verify-otp-btn"
                    onClick={handleVerifyOtp}
                    disabled={verifyingOtp}
                  >

                    {verifyingOtp
                      ? "Verifying..."
                      : "Verify OTP"
                    }

                  </button>

                </div>

              </div>

            )}


            {/* ================= VERIFIED MESSAGE ================= */}

            {isEmailVerified && (

              <div className="email-verified-message">

                ✓ Email verified successfully

              </div>

            )}


            {/* ================= PHONE ================= */}

            <label>Phone Number</label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />


            {/* ================= ROLL / ADMIN ID ================= */}

            <label>

              {userType === "student"
                ? "Roll Number"
                : "Admin ID"
              }

            </label>

            <input
              type="text"

              name={
                userType === "student"
                  ? "rollNumber"
                  : "adminId"
              }

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

              required
            />


            {/* ================= COURSE ================= */}

            <label>Course</label>

            {userType === "student" ? (

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >

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

              </select>

            ) : (

              <input
                type="text"
                value="N/A"
                readOnly
              />

            )}


            {/* ================= HOSTEL ================= */}

            <label>Hostel</label>

            <select
              name="hostel"
              value={formData.hostel}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Hostel
              </option>

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
              required
            />


            <label>Confirm Password</label>

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm password"
              required
            />


            {/* ================= CREATE ACCOUNT ================= */}

            <button
              type="submit"
              className="register-btn"
              disabled={registering}
            >

              {registering
                ? "Creating Account..."
                : "Create Account"
              }

            </button>

          </form>


          <p className="login-link">

            Already have an account?{" "}

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
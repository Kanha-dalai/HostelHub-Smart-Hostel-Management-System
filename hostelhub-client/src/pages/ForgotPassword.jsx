import "./ForgotPassword.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import hostelBg from "../assets/hostel-bg.jpg";

function ForgotPassword() {

  const navigate = useNavigate();

  // Current step:
  // 1 = Enter Email
  // 2 = Verify OTP
  // 3 = Reset Password
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);


  // ======================================================
  // SEND FORGOT PASSWORD OTP
  // ======================================================

  const handleSendOtp = async (e) => {

    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your registered email address");
      return;
    }

    try {

      setLoading(true);

      const response = await API.post(
        "/auth/send-forgot-password-otp",
        {
          email: email
        }
      );

      alert(response.data.message);

      // Move to OTP verification step
      setStep(2);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to send OTP"
      );

    } finally {

      setLoading(false);

    }
  };


  // ======================================================
  // VERIFY FORGOT PASSWORD OTP
  // ======================================================

  const handleVerifyOtp = async (e) => {

    e.preventDefault();

    if (!otp.trim()) {
      alert("Please enter the OTP");
      return;
    }

    if (otp.length !== 6) {
      alert("OTP must be 6 digits");
      return;
    }

    try {

      setLoading(true);

      const response = await API.post(
        "/auth/verify-forgot-password-otp",
        {
          email: email,
          otp: otp
        }
      );

      alert(response.data.message);

      // Move to reset-password step
      setStep(3);

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "OTP verification failed"
      );

    } finally {

      setLoading(false);

    }
  };


  // ======================================================
  // RESET PASSWORD
  // ======================================================

  const handleResetPassword = async (e) => {

    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      alert("Please enter and confirm your new password");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      const response = await API.post(
        "/auth/reset-password",
        {
          email: email,
          newPassword: newPassword,
          confirmPassword: confirmPassword
        }
      );

      alert(response.data.message);

      // Redirect to login page
      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Password reset failed"
      );

    } finally {

      setLoading(false);

    }
  };


  // ======================================================
  // RESEND OTP
  // ======================================================

  const handleResendOtp = async () => {

    try {

      setLoading(true);

      const response = await API.post(
        "/auth/send-forgot-password-otp",
        {
          email: email
        }
      );

      alert(response.data.message);

      // Clear old entered OTP
      setOtp("");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to resend OTP"
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="forgot-page">

      {/* ================= LEFT SIDE ================= */}

      <div
        className="forgot-left"
        style={{
          backgroundImage: `url(${hostelBg})`
        }}
      >

        <div className="forgot-overlay"></div>

        <div className="forgot-left-content">

          <h1>🏠 HostelHub</h1>

          <h2>
            Secure Your
            <br />
            <span>HostelHub Account</span>
          </h2>

          <p>
            Forgot your password? No problem. Verify your
            registered email address using a secure OTP and
            create a new password for your HostelHub account.
          </p>

          <div className="forgot-features">

            <div>📧 Email OTP Verification</div>

            <div>🔐 Secure Password Reset</div>

            <div>⏱ OTP Valid for 10 Minutes</div>

            <div>🛡 Protected Account Recovery</div>

          </div>

        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="forgot-right">

        <div className="forgot-card">

          <div className="forgot-icon">
            🔐
          </div>

          <h2>Forgot Password?</h2>


          {/* ================= STEP INDICATOR ================= */}

          <div className="step-indicator">

            <div className={step >= 1 ? "step active" : "step"}>
              <span>1</span>
              <p>Email</p>
            </div>

            <div className={step >= 2 ? "step active" : "step"}>
              <span>2</span>
              <p>Verify OTP</p>
            </div>

            <div className={step >= 3 ? "step active" : "step"}>
              <span>3</span>
              <p>New Password</p>
            </div>

          </div>


          {/* ================= STEP 1: EMAIL ================= */}

          {step === 1 && (

            <form onSubmit={handleSendOtp}>

              <p className="forgot-subtitle">
                Enter your registered email address and we'll
                send you a 6-digit OTP.
              </p>

              <label>Email Address</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />

              <button
                type="submit"
                className="forgot-main-btn"
                disabled={loading}
              >

                {loading
                  ? "Sending OTP..."
                  : "Send OTP"
                }

              </button>

            </form>

          )}


          {/* ================= STEP 2: OTP ================= */}

          {step === 2 && (

            <form onSubmit={handleVerifyOtp}>

              <p className="forgot-subtitle">
                We sent a 6-digit OTP to:
              </p>

              <p className="forgot-email">
                {email}
              </p>

              <label>Enter OTP</label>

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
                placeholder="Enter 6-digit OTP"
                className="otp-input"
                required
              />

              <button
                type="submit"
                className="forgot-main-btn"
                disabled={loading}
              >

                {loading
                  ? "Verifying..."
                  : "Verify OTP"
                }

              </button>


              <button
                type="button"
                className="resend-btn"
                onClick={handleResendOtp}
                disabled={loading}
              >

                Didn't receive OTP? Resend OTP

              </button>

            </form>

          )}


          {/* ================= STEP 3: NEW PASSWORD ================= */}

          {step === 3 && (

            <form onSubmit={handleResetPassword}>

              <p className="forgot-subtitle">
                Your email has been verified successfully.
                Create a new password for your account.
              </p>

              <div className="verified-box">
                ✓ Email verified successfully
              </div>

              <label>New Password</label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Enter new password"
                required
              />

              <label>Confirm New Password</label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm new password"
                required
              />

              <button
                type="submit"
                className="forgot-main-btn"
                disabled={loading}
              >

                {loading
                  ? "Resetting Password..."
                  : "Reset Password"
                }

              </button>

            </form>

          )}


          {/* ================= BACK TO LOGIN ================= */}

          <p className="back-login">

            <Link to="/login">
              ← Back to Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );

}

export default ForgotPassword;
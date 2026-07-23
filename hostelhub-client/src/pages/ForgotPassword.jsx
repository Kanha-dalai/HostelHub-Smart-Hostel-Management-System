import "./ForgotPassword.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import hostelBg from "../assets/hostel-bg.jpg";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ======================================================
  // RESET PASSWORD
  // ======================================================

  const handleResetPassword = async (e) => {

    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your registered email.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      alert("Please enter and confirm your new password.");
      return;
    }

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {

      setLoading(true);

      const response = await API.post(
        "/auth/reset-password",
        {
          email,
          newPassword,
          confirmPassword
        }
      );

      alert(response.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Password reset failed."
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
            Forgot your password? No problem.
            Enter your registered email and create
            a new password to regain access to your
            HostelHub account.
          </p>

          <div className="forgot-features">

            <div>🔐 Secure Password Reset</div>

            <div>📧 Registered Email Verification</div>

            <div>🛡 Protected Account Recovery</div>

            <div>⚡ Fast Password Recovery</div>

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

          <form onSubmit={handleResetPassword}>

            <p className="forgot-subtitle">
              Enter your registered email and create a new password.
            </p>

            <label>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
            />

            <label>New Password</label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              required
            />

            <label>Confirm New Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
                : "Reset Password"}
            </button>

          </form>

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
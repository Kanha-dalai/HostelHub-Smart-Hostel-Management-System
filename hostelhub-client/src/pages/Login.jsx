import "./Login.css";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api";
import hostelBg from "../assets/hostel-bg.jpg";

function Login() {

  const navigate = useNavigate();

  const[role, setRole] = useState("student");

  const[formData, setFormData] = useState({
    email: "",
    password:""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await API.post("/auth/login",{
        email: formData.email,
        password: formData.password
      });

      //Save Token
      localStorage.setItem("token", response.data.token);

      //Save User
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );
      alert(response.data.message);

      //Redirect
      if(response.data.user.role === "student") {
        navigate("/student/dashboard");
      } else {
        navigate("/admin/dashboard");
      }
    }catch(error){
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">

      {/* Left Section */}
      <div
        className="left-side"
        style={{
          backgroundImage: `url(${hostelBg})`,
        }}
      >
        <div className="overlay"></div>

        <div className="left-content">

          <div className="hero-content">

            <h2>

              Manage Your Hostel

              <br />

              <span>Smarter & Faster</span>

            </h2>

            <p>

              A modern hostel management platform
              designed for students and administrators.

              Manage rooms, complaints, leave requests,
              notices and much more from one place.

            </p>

          </div>

          <div className="feature-list">

            <div className="feature-item">

              🏢 Multiple Hostel Management

            </div>

            <div className="feature-item">

              🛏 Smart Room Allocation

            </div>

            <div className="feature-item">

              📝 Leave Management

            </div>

            <div className="feature-item">

              🛠 Complaint Tracking

            </div>

            <div className="feature-item">

              📢 Digital Notice Board

            </div>

          </div>

        </div>

      </div>

      {/* Right Section */}

      <div className="right-side">

        <div className="login-card">

          <div className="role-buttons">

            <button
              type="button"
              className={role === "student" ? "active-btn" : ""}
              onClick={() => setRole("student")}
            >

              Student

            </button>

            <button
              type="button"
              className={role === "admin" ? "active-btn" : ""}
              onClick={() => setRole("admin")}
            >

              Admin

            </button>

          </div>

          <h2>

            Welcome Back 👋

          </h2>

          <p className="subtitle">

            Login to continue

          </p>

          <form onSubmit={handleSubmit}>

            <label>Email Address</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <div className="options">

              <label className="remember">

                <input type="checkbox" />

                Remember Me

              </label>

              <Link to="#">

                Forgot Password?

              </Link>

            </div>

            <button
              className="login-btn"
              type="submit"
            >

              Login

            </button>

          </form>

          <p className="register">

            Don't have an account?

            <Link to="/register">

              Register Here

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
import "./Home.css";
import { Link } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import bgImage from "../assets/hostel-bg.jpg";
import Features from "../components/Features";
import About from "../components/About";
import ContactUs from "../components/ContactUs";



function Home() {
  return (
    <>
      {/* ================= HOME SECTION ================= */}

      <div
        className="home"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >

        {/* Navbar */}

        <nav className="navbar">

          <div className="logo">

            <h2>🏠 HostelHub</h2>

            <span>Smart Hostel Management System</span>

          </div>

          <ul className="nav-links">

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/features">Features</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/contactus">Contact Us</Link>
            </li>

          </ul>

          <div className="nav-buttons">

            <Link to="/login" className="login-btn">
              Login
            </Link>

            <Link to="/register" className="register-btn">
              Register
            </Link>

          </div>

        </nav>

        {/* Hero Section */}

        <section className="hero">

          <span className="hero-tag">

            Welcome to HostelHub

          </span>

          <TypeAnimation
            sequence={[
              "Smart Hostel Management System",
              2000,
              "Manage Your Hostel Digitally",
              2000,
              "Welcome to HostelHub",
              2000,
            ]}
            wrapper="h1"
            speed={50}
            repeat={Infinity}
            className="hero-title"
          />

          <p>

            Simplify hostel administration with one digital
            platform. Manage students, rooms, complaints,
            leave requests, notices and much more.

          </p>

          <div className="hero-buttons">

            <Link to="/login">

              <button className="student-btn">

                Student Login

              </button>

            </Link>

            <Link to="/login">

              <button className="admin-btn">

                Admin Login

              </button>

            </Link>

          </div>

        </section>

      </div>

      {/* ================= FEATURES ================= */}

      <Features />
      <About />
      <ContactUs />
    </>
  );
}

export default Home;
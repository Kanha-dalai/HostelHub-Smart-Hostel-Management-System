import "./About.css";
import hostelBg from "../assets/hostel-bg.jpg";

function About() {
  return (
    <div
      className="about-page"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.75),
          rgba(0,0,0,0.75)
        ), url(${hostelBg})`,
      }}
    >
      {/* Header */}

      <section className="about-header">

        <span className="about-badge">
          ABOUT HOSTELHUB
        </span>

        <h1>About Our Project</h1>

        <p>
          HostelHub is a modern Hostel Management System
          designed to simplify hostel administration for
          students and wardens through one secure digital
          platform.
        </p>

      </section>

      {/* About Content */}

      <section className="about-container">

        <div className="about-card">

          <h2>🎯 Our Mission</h2>

          <p>
            Our mission is to digitize hostel operations by
            providing a centralized platform for managing
            students, rooms, complaints, leave requests,
            notices and hostel activities efficiently.
          </p>

        </div>

        <div className="about-card">

          <h2>👁 Our Vision</h2>

          <p>
            To create a smart, secure and paperless hostel
            environment where students and administrators
            can interact easily and efficiently.
          </p>

        </div>

        <div className="about-card">

          <h2>💡 Why HostelHub?</h2>

          <ul>

            <li>✔ Easy Student Registration</li>

            <li>✔ Secure Login System</li>

            <li>✔ Smart Room Allocation</li>

            <li>✔ Online Leave Application</li>

            <li>✔ Complaint Tracking</li>

            <li>✔ Digital Notice Board</li>

            <li>✔ Admin Dashboard</li>

            <li>✔ Responsive Design</li>

          </ul>

        </div>

      </section>

      {/* Statistics */}

      <section className="stats-section">

        <div className="stat-card">

          <h2>10+</h2>

          <p>Hostels</p>

        </div>

        <div className="stat-card">

          <h2>2500+</h2>

          <p>Students</p>

        </div>

        <div className="stat-card">

          <h2>500+</h2>

          <p>Rooms</p>

        </div>

        <div className="stat-card">

          <h2>24×7</h2>

          <p>Support</p>

        </div>

      </section>

      {/* Footer */}

      <section className="about-footer">

        <h2>
          Building the Future of Hostel Management
        </h2>

        <p>
          HostelHub helps educational institutions
          automate hostel operations with a modern,
          secure and user-friendly web application
          developed using the MERN Stack.
        </p>

      </section>

    </div>
  );
}

export default About;
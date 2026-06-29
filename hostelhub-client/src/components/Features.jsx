import "./Features.css";
import hostelBg from "../assets/hostel-bg.jpg";

function Features() {
  return (
    <div
      className="features-page"
      id="features"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.75),
          rgba(0,0,0,0.75)
        ), url(${hostelBg})`,
      }}
    >
      <div className="feature-header">

        <span className="feature-badge">
          WHY CHOOSE HOSTELHUB
        </span>

        <h1>Our Features</h1>

        <p>
          HostelHub provides everything required to
          manage hostels efficiently. Students and
          administrators can access all hostel services
          through one secure digital platform.
        </p>

      </div>

      <div className="feature-container">

        <div className="feature-card">

          <div className="feature-icon">🏢</div>

          <h2>Hostel Management</h2>

          <p>
            Manage multiple boys' and girls' hostels,
            hostel blocks, rooms and student records
            from one dashboard.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">🛏</div>

          <h2>Room Allocation</h2>

          <p>
            Allocate rooms automatically and
            monitor room availability in real time.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">📝</div>

          <h2>Leave Management</h2>

          <p>
            Students can apply for leave online
            while wardens approve or reject requests.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">🛠</div>

          <h2>Complaint System</h2>

          <p>
            Raise complaints, track their status,
            and receive updates instantly.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">📢</div>

          <h2>Digital Notice Board</h2>

          <p>
            Publish important hostel announcements
            that reach every student immediately.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">👨‍🎓</div>

          <h2>Student Dashboard</h2>

          <p>
            Access room details, leave requests,
            complaints and notices from one place.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">👨‍💼</div>

          <h2>Admin Dashboard</h2>

          <p>
            Manage students, hostel records,
            room allocations and reports efficiently.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">🔒</div>

          <h2>Secure Authentication</h2>

          <p>
            Role-based login system with JWT
            authentication for maximum security.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Features;
import "./StudentDashboard.css";

function StudentDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="dashboard">

            {/* Header */}

            <header className="dashboard-header">

                <div>
                    <h1>🏠 HostelHub</h1>
                    <p>Smart Hostel Management System</p>
                </div>

                <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = "/";
                    }}
                >
                    Logout
                </button>

            </header>

            {/* Welcome */}

            <section className="welcome">

                <h2>
                    Welcome, {user?.fullName} 👋
                </h2>

                <p>
                    Glad to see you again.
                    Here are your hostel details.
                </p>

            </section>

            {/* Cards */}

            <section className="card-container">

                <div className="card">
                    <h3>👤 Name</h3>
                    <p>{user?.fullName}</p>
                </div>

                <div className="card">
                    <h3>🎓 Course</h3>
                    <p>{user?.course}</p>
                </div>

                <div className="card">
                    <h3>🏠 Hostel</h3>
                    <p>{user?.hostel}</p>
                </div>

                <div className="card">
                    <h3>🆔 Roll Number</h3>
                    <p>{user?.rollNumber}</p>
                </div>

            </section>

            {/* Profile */}

            <section className="profile">

                <h2>Student Information</h2>

                <table>

                    <tbody>

                        <tr>
                            <td>Full Name</td>
                            <td>{user?.fullName}</td>
                        </tr>

                        <tr>
                            <td>Email</td>
                            <td>{user?.email}</td>
                        </tr>

                        <tr>
                            <td>Phone</td>
                            <td>{user?.phone}</td>
                        </tr>

                        <tr>
                            <td>Role</td>
                            <td>{user?.role}</td>
                        </tr>

                        <tr>
                            <td>Course</td>
                            <td>{user?.course}</td>
                        </tr>

                        <tr>
                            <td>Hostel</td>
                            <td>{user?.hostel}</td>
                        </tr>

                        <tr>
                            <td>Roll Number</td>
                            <td>{user?.rollNumber}</td>
                        </tr>

                    </tbody>

                </table>

            </section>

            <footer>

                © 2026 HostelHub | Smart Hostel Management System

            </footer>

        </div>
    );
}

export default StudentDashboard;
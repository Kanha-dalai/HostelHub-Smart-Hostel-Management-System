import "./AdminDashboard.css";

function AdminDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="admin-dashboard">

            {/* Header */}

            <header className="admin-header">

                <div>
                    <h1>🏠 HostelHub</h1>
                    <p>Admin Control Panel</p>
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

            <section className="admin-welcome">

                <h2>Welcome, {user?.fullName} 👨‍💼</h2>

                <p>
                    Manage students, rooms, complaints and notices from one place.
                </p>

            </section>

            {/* Cards */}

            <section className="admin-card-container">

                <div className="admin-card">
                    <h3>👨 Students</h3>
                    <p>250</p>
                </div>

                <div className="admin-card">
                    <h3>🛏 Rooms</h3>
                    <p>120</p>
                </div>

                <div className="admin-card">
                    <h3>📄 Leave Requests</h3>
                    <p>18</p>
                </div>

                <div className="admin-card">
                    <h3>⚠ Complaints</h3>
                    <p>12</p>
                </div>

            </section>

            {/* Admin Details */}

            <section className="admin-profile">

                <h2>Administrator Information</h2>

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
                            <td>Admin ID</td>
                            <td>{user?.adminId}</td>
                        </tr>

                        <tr>
                            <td>Hostel</td>
                            <td>{user?.hostel}</td>
                        </tr>

                    </tbody>

                </table>

            </section>

            {/* Quick Actions */}

            <section className="quick-actions">

                <h2>Quick Actions</h2>

                <div className="action-grid">

                    <button>Add Student</button>

                    <button>Manage Rooms</button>

                    <button>Approve Leave</button>

                    <button>View Complaints</button>

                    <button>Create Notice</button>

                    <button>Generate Report</button>

                </div>

            </section>

            <footer>

                © 2026 HostelHub | Admin Dashboard

            </footer>

        </div>
    );
}

export default AdminDashboard;
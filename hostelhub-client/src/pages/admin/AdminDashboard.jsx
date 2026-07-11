import "./AdminDashboard.css";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {

    // React Router navigation
    const navigate = useNavigate();


    // ======================================================
    // GET LOGGED-IN ADMIN DATA
    // ======================================================

    const storedUser = localStorage.getItem("user");

    let user = null;

    try {

        if (storedUser) {
            user = JSON.parse(storedUser);
        }

    } catch (error) {

        console.error("Invalid user data in localStorage:", error);

    }


    // ======================================================
    // LOGOUT FUNCTION
    // ======================================================

    const handleLogout = () => {

        // Remove JWT token
        localStorage.removeItem("token");

        // Remove logged-in user information
        localStorage.removeItem("user");

        // Redirect to Login page
        navigate("/login", {
            replace: true
        });

    };


    return (

        <div className="admin-dashboard">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="admin-header">

                <div>

                    <h1>
                        🏠 HostelHub
                    </h1>

                    <p>
                        Admin Control Panel
                    </p>

                </div>


                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>


            {/* ==================================================
                WELCOME SECTION
            ================================================== */}

            <section className="admin-welcome">

                <h2>
                    Welcome, {user?.fullName || "Administrator"} 👨‍💼
                </h2>

                <p>
                    Manage students, rooms, complaints and notices
                    from one place.
                </p>

            </section>


            {/* ==================================================
                DASHBOARD CARDS
            ================================================== */}

            <section className="admin-card-container">


                {/* Students Card */}

                <div className="admin-card">

                    <h3>
                        👨 Students
                    </h3>

                    <p>
                        250
                    </p>

                </div>


                {/* Rooms Card */}

                <div className="admin-card">

                    <h3>
                        🛏 Rooms
                    </h3>

                    <p>
                        120
                    </p>

                </div>


                {/* Leave Requests Card */}

                <div className="admin-card">

                    <h3>
                        📄 Leave Requests
                    </h3>

                    <p>
                        18
                    </p>

                </div>


                {/* Complaints Card */}

                <div className="admin-card">

                    <h3>
                        ⚠ Complaints
                    </h3>

                    <p>
                        12
                    </p>

                </div>

            </section>


            {/* ==================================================
                ADMINISTRATOR INFORMATION
            ================================================== */}

            <section className="admin-profile">

                <h2>
                    Administrator Information
                </h2>

                <table>

                    <tbody>


                        {/* Full Name */}

                        <tr>

                            <td>
                                Full Name
                            </td>

                            <td>
                                {user?.fullName || "Not Available"}
                            </td>

                        </tr>


                        {/* Email */}

                        <tr>

                            <td>
                                Email
                            </td>

                            <td>
                                {user?.email || "Not Available"}
                            </td>

                        </tr>


                        {/* Phone */}

                        <tr>

                            <td>
                                Phone
                            </td>

                            <td>
                                {user?.phone || "Not Available"}
                            </td>

                        </tr>


                        {/* Role */}

                        <tr>

                            <td>
                                Role
                            </td>

                            <td>
                                {user?.role || "Not Available"}
                            </td>

                        </tr>


                        {/* Admin ID */}

                        <tr>

                            <td>
                                Admin ID
                            </td>

                            <td>
                                {user?.adminId || "Not Available"}
                            </td>

                        </tr>


                        {/* Hostel */}

                        <tr>

                            <td>
                                Hostel
                            </td>

                            <td>
                                {user?.hostel || "Not Available"}
                            </td>

                        </tr>

                    </tbody>

                </table>

            </section>


            {/* ==================================================
                QUICK ACTIONS
            ================================================== */}

            <section className="quick-actions">

                <h2>
                    Quick Actions
                </h2>

                <div className="action-grid">

                    <button>
                        Add Student
                    </button>

                    <button>
                        Manage Rooms
                    </button>

                    <button>
                        Approve Leave
                    </button>

                    <button>
                        View Complaints
                    </button>

                    <button>
                        Create Notice
                    </button>

                    <button>
                        Generate Report
                    </button>

                </div>

            </section>
            
        </div>

    );

}

export default AdminDashboard;
import "./StudentDashboard.css";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {

    // React Router navigation
    const navigate = useNavigate();


    // Get logged-in user information from localStorage
    const storedUser = localStorage.getItem("user");

    let user = null;

    try {

        if (storedUser) {
            user = JSON.parse(storedUser);
        }

    } catch (error) {

        console.error("Invalid user data:", error);

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

        <div className="dashboard">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="dashboard-header">

                <div>

                    <h1>
                        🏠 HostelHub
                    </h1>

                    <p>
                        Smart Hostel Management System
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

            <section className="welcome">

                <h2>
                    Welcome, {user?.fullName || "Student"} 👋
                </h2>

                <p>
                    Glad to see you again.
                    Here are your hostel details.
                </p>

            </section>


            {/* ==================================================
                STUDENT DETAILS CARDS
            ================================================== */}

            <section className="card-container">


                {/* Name Card */}

                <div className="card">

                    <h3>
                        👤 Name
                    </h3>

                    <p>
                        {user?.fullName || "Not Available"}
                    </p>

                </div>


                {/* Course Card */}

                <div className="card">

                    <h3>
                        🎓 Course
                    </h3>

                    <p>
                        {user?.course || "Not Available"}
                    </p>

                </div>


                {/* Hostel Card */}

                <div className="card">

                    <h3>
                        🏠 Hostel
                    </h3>

                    <p>
                        {user?.hostel || "Not Available"}
                    </p>

                </div>


                {/* Roll Number Card */}

                <div className="card">

                    <h3>
                        🆔 Roll Number
                    </h3>

                    <p>
                        {user?.rollNumber || "Not Available"}
                    </p>

                </div>

            </section>


            {/* ==================================================
                STUDENT INFORMATION
            ================================================== */}

            <section className="profile">

                <h2>
                    Student Information
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


                        {/* Course */}

                        <tr>

                            <td>
                                Course
                            </td>

                            <td>
                                {user?.course || "Not Available"}
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


                        {/* Roll Number */}

                        <tr>

                            <td>
                                Roll Number
                            </td>

                            <td>
                                {user?.rollNumber || "Not Available"}
                            </td>

                        </tr>

                    </tbody>

                </table>

            </section>

        </div>

    );

}

export default StudentDashboard;
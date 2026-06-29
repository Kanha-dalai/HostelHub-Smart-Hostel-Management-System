import { Link } from "react-router-dom";
import "./../styles/Dashboard.css";

function Sidebar() {

    return (

        <div className="sidebar">

            <h2 className="logo">
                HostelHub
            </h2>

            <ul>

                <li>
                    <Link to="/student/dashboard">
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/student/profile">
                        My Profile
                    </Link>
                </li>

                <li>
                    <Link to="/student/room">
                        Room Details
                    </Link>
                </li>

                <li>
                    <Link to="/student/leave">
                        Leave
                    </Link>
                </li>

                <li>
                    <Link to="/student/complaint">
                        Complaint
                    </Link>
                </li>

                <li>
                    <Link to="/student/notice">
                        Notice Board
                    </Link>
                </li>

                <li>
                    <Link to="/">
                        Logout
                    </Link>
                </li>

            </ul>

        </div>

    );

}

export default Sidebar;
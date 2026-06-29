import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import "../styles/Dashboard.css";

function DashboardLayout({ children }) {

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <Topbar />

                <div className="main-content">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default DashboardLayout;
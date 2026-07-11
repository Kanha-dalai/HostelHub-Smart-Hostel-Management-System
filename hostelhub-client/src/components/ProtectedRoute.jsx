import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {

  // Get JWT token from localStorage
  const token = localStorage.getItem("token");

  // Get user information from localStorage
  const storedUser = localStorage.getItem("user");

  let user = null;

  // Safely convert stored JSON string into JavaScript object
  try {

    if (storedUser) {
      user = JSON.parse(storedUser);
    }

  } catch (error) {

    console.error("Invalid user data in localStorage:", error);

    // Remove invalid stored data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }


  // ==========================================
  // CHECK 1: Is the user logged in?
  // ==========================================

  if (!token || !user) {

    return <Navigate to="/login" replace />;

  }


  // ==========================================
  // CHECK 2: Does the user have correct role?
  // ==========================================

  if (allowedRole && user.role !== allowedRole) {

    // If Student tries to access Admin Dashboard
    if (user.role === "student") {

      return (
        <Navigate
          to="/student/dashboard"
          replace
        />
      );

    }

    // If Admin tries to access Student Dashboard
    if (user.role === "admin") {

      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );

    }

    // Unknown role
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return <Navigate to="/login" replace />;
  }


  // User is authenticated and has correct role
  return children;
};

export default ProtectedRoute;
import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Check if the user is logged in
  if (!user?.role || !user?.token) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  // Redirect to the appropriate dashboard based on user's role
  if (!allowedRoles.includes(user.role)) {
    if (user.role === "Customer") {
      return <Navigate to="/customer-dashboard" />;
    } else if (user.role === "Agent") {
      return <Navigate to="/agent-dashboard" />;
    } else if (user.role === "Admin") {
      return <Navigate to="/admin-dashboard" />;
    }
  }

  // If the user has the appropriate role, render the route
  return <Outlet />;
};

export default PrivateRoute;

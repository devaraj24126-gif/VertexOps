import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (adminOnly && role !== "ADMIN") {
    return <Navigate to="/tickets" replace />;
  }

  return children;
}

export default ProtectedRoute;
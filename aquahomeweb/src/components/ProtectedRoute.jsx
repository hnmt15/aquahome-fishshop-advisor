import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowedRoles, publicForUnauthenticated = false, }) {
  const { user } = useAuth();

  if (!user) {
    if (publicForUnauthenticated) {
      return children;
    }
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "ADMIN" || user.role === "STAFF") {
      return <Navigate to="/management/home" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}
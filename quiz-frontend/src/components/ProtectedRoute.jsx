import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { isLoggedIn, role } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" />;


  return children;
}


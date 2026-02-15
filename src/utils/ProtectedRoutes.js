import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../services/authStorage";

function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/subscribe" replace />;
  }
  return children;
}

export default ProtectedRoute;

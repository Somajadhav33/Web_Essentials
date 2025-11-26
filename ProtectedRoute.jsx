import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const jwt_token = Cookies.get("jwt");
  if (jwt_token === undefined) {
    return <Navigate to="/login" replace/>;
  }
  return children;
};

export { ProtectedRoute };
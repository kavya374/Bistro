import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  return token ? children : <Navigate to="/admin-login" />;
};

export default RequireAdmin;

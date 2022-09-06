import { Navigate, Outlet } from "react-router-dom";

const LoggedIn = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
    
  }
  return <Outlet />;
};

export default LoggedIn;

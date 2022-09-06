import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ isAuthenticated, isManager }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!isManager) {
    return <Navigate to="/forbidden" />;
  }
  return <Outlet />;
};

export default AdminRoute;

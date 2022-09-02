import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ isAuthenticated, isManager }) => {
  if (!isAuthenticated) {
    console.log('Admin not authenticated');
    return <Navigate to="/login" />;
  }
  
  if (!isManager) {
    console.log('Admin not manager');
    return <Navigate to="/forbidden" />;
  }
  console.log('Admin Success');
  return <Outlet />;
};

export default AdminRoute;

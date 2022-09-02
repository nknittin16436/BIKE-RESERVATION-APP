import { Navigate, Outlet } from "react-router-dom";

const LoggedIn = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    console.log('Regular not authenticated');
    return <Navigate to="/login" />;
    
  }
  console.log('Regular success');
  return <Outlet />;
};

export default LoggedIn;

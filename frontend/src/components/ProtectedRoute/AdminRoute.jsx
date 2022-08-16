import { Navigate } from "react-router-dom";
import {  useSelector } from "react-redux";

const AdminRoute = ({ element }) => {
  const { isManager ,loggedInUser} = useSelector((state) => state.bikeReservation);
    
  if(!loggedInUser){
    return <Navigate to="/login" replace={true} />;

  }
  if (isManager) {
    return element;
  }

  
  return <Navigate to="/forbidden" replace={true} />;
};

export default AdminRoute;

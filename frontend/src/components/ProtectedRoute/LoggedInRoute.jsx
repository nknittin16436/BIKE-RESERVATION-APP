import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoggedIn = ({ element }) => {
  const { loggedInUser } = useSelector((state) => state.bikeReservation);
  const token = localStorage.getItem("bike-user");
  if (loggedInUser) {
    return element;
  }
  return <Navigate to="/login" replace={true} />;
};

export default LoggedIn;

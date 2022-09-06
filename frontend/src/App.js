import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Auth/SignIn';
import {
  Routes,
  Route,
} from "react-router-dom";
import { useEffect } from 'react';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home/Home';
import Reservation from './components/Reservation/Reservation';
import Navbar from './components/Home/Navbar/Navbar';
import Users from './components/User/Users';
import UserReservation from './components/Reservation/UserReservation';
import Bike from './components/Home/Bikes/Bikes';
import BikeReservation from './components/Reservation/BikeReservation';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from './Service/UserService';
import { useDispatch } from 'react-redux'
import AllReservation from './components/Reservation/AllReservations';
import ForbiddenAccess from './components/ProtectedRoute/Forbidden';
import AdminRoute from './components/ProtectedRoute/AdminRoute';
import LoggedIn from './components/ProtectedRoute/LoggedInRoute';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = localStorage.getItem("bike-user-loggedIn");
  const isManager = localStorage.getItem("bike-user-role");
  // console.log(isAuthenticated, "isAuthenticated", isManager)
  const getLoggedInUser = async () => {
    const token = localStorage.getItem('bike-user');
    if (token) {

      try {
        const data = await getUserDetails(token);
        if (data.success) {

          dispatch({ type: "isAuthenticated", payload: true });
          dispatch({ type: "loggedInUser", payload: data.user });
          if (data.user.role === "manager") {
            dispatch({ type: "isManager", payload: true });
          }
        }
        // console.log(data);
      } catch (error) {
        alert.show(error.message);
      }
    }
    else {
      navigate('/login')
    }

  }

  useEffect(() => {
    getLoggedInUser();
  }, [isAuthenticated]);

  return (
    <div>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        <Route element={<LoggedIn isAuthenticated={isAuthenticated === "true" ? true : false} />} >
          <Route path="/bikes" element={<Bike />} />
          <Route path="" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/reservation" element={<Reservation />} />
        </Route>

        <Route element={<AdminRoute isAuthenticated={isAuthenticated === "true" ? true : false} isManager={isManager === "true" ? true : false} />} >
          <Route path="/users" element={<Users />} />
          <Route path="/reservations" element={<AllReservation />} />
          <Route path="/reservations/bike" element={<BikeReservation />} />
          <Route path="/reservations/user" element={<UserReservation />} />
        </Route>


        <Route path="/forbidden" element={<ForbiddenAccess />} />
      </Routes>
    </div>

  );
}

export default App;

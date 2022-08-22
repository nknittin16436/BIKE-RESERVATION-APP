import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './components/Auth/SignIn';
import {
  BrowserRouter,
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
import { useSelector } from 'react-redux'

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedInUser } = useSelector((state) => state.bikeReservation)
  const getLoggedInUser = async () => {
    const token = localStorage.getItem('bike-user');
    if (token) {
      const data = await getUserDetails(token);
      dispatch({ type: "loggedInUser", payload: data.user });
      if (data.user.role === "manager") {
        dispatch({ type: "isManager", payload: true });

      }
      console.log(data);
    }
    else {
      navigate('/login')
    }

  }

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <div>
      {loggedInUser && loggedInUser.name && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<LoggedIn element={<Home />} />} />
        <Route path="/home" element={<LoggedIn element={<Home />} />} />
        <Route path="/bikes" element={<LoggedIn element={<Bike />} />} />
        <Route path="/users" element={<AdminRoute element={<Users />} />} />
        <Route path="/reservations" element={<AdminRoute element={<AllReservation />} />} />
        <Route path="/reservation" element={<LoggedIn element={<Reservation />} />} />
        <Route path="/reservations/bike" element={<AdminRoute element={<BikeReservation />} />} />
        <Route path="/reservations/user" element={<AdminRoute element={<UserReservation />} />} />
        <Route path="/forbidden" element={<ForbiddenAccess />} />
      </Routes>
    </div>

  );
}

export default App;

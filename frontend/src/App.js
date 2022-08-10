import './App.css';
import Login from './components/Auth/SignIn';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useEffect } from 'react';
import SignUp from './components/Auth/SignUp';
import Home from './components/Home/Home';
import AntdHome from './components/Home/AntdHome';
import Reservation from './components/Reservation/Reservation';
import Navbar from './components/Home/Navbar/Navbar';
import Users from './components/User/Users';
import UserReservation from './components/Reservation/UserReservation';
import Bike from './components/Home/Bikes/Bikes';
import BikeReservation from './components/Reservation/BikeReservation';
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from './Service/UserService';
import { useDispatch } from 'react-redux'

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getLoggedInUser = async () => {
    const token = localStorage.getItem('bike-user');
    if (token) {
      const data = await getUserDetails(token);
      if (data.user.role === "manager") {
        dispatch({ type: "isManager", payload: true });

      }
      dispatch({ type: "loggedInUser", payload: data.user });
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

      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/bikes" element={<Bike />} />

        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/reservations/bike" element={<BikeReservation />} />
        <Route path="/reservations/user" element={<UserReservation />} />
      </Routes>
    </div>

  );
}

export default App;

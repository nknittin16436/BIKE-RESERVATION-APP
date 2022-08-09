import './App.css';
import Login from './components/Auth/SignIn';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from './components/Auth/SignUp';
import Home from './components/Home/Home';
import AntdHome from './components/Home/AntdHome';
import Reservation from './components/Reservation/Reservation';
import Navbar from './components/Home/Navbar/Navbar';
import Users from './components/User/Users';
import UserReservation from './components/Reservation/UserReservation';
import Bike from './components/Home/Bikes/Bikes';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/bikes" element={<Bike />} />

        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/reservation" element={<UserReservation />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

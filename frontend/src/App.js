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

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/antd" element={<AntdHome />} />
        <Route path="/reservations" element={<Reservation />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

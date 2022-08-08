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

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<SignUp />}/>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/antd" element={<AntdHome />}/>
        <Route path="/reservations" element={<Reservation />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

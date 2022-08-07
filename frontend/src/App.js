import './App.css';
import Login from './components/Auth/SignIn';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from './components/Auth/SignUp';

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<SignUp />}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

// src/App.js
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Register from './page/Register';
import Login from './page/Login';
import UserDashboard from './page/UserDashboard';
import Home from './page/Home';
import Admin from './page/Admin';
import NavbarMenu from './components/NavbarMenu';
import Notice from './components/Notice';
import Footer from './components/Footer';
import'./App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAdminCheck from './hooks/useAdminCheck';


function App() {
  
  const {isAdmin,user} = useAdminCheck();
  return (

    
    <Router>
      <NavbarMenu/>
      <ToastContainer />
      <Routes>
      <Route path="/" element={<Home/>} />

      {user&& <>
      <Route path="/notice" element={<Notice/>} />
      <Route path="/user" element={<UserDashboard />} />
      </>}
      {isAdmin&& <Route path="/Admin" element={<Admin />} />}
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />

      </Routes>
      <Footer/>
    </Router>
    
    
  );
}

export default App;

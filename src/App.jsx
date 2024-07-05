// src/App.js
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Register from './page/Register';
import Login from './page/Login';
import AdminDashboard from './page/AdminDashboard';
import UserDashboard from './page/UserDashboard';
// import Home from './page/Home';
import Admin from './page/Admin';
import NavbarMenu from './components/NavbarMenu';
import Notice from './components/Notice';
import'./App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  
  return (

    
    <Router>
      <NavbarMenu/>
      <ToastContainer />
      <Routes>
      <Route path="/" element={<Notice/>} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin3" element={<AdminDashboard />}  />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/registration" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
      
      </Routes>
    </Router>
    
    
  );
}

export default App;

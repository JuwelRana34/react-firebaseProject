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
// import AdminCheck from './usercontext/AdminCheck';


function App() {
  
  return (

    
    <Router>
      <NavbarMenu/>
     
      <Routes>
      <Route path="/" element={<Notice/>} />
      <Route path="/Admin3" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<AdminDashboard />}  />
      {/* <Route path="/admin2" element={<AdminCheck />}  /> */}
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/registration" element={<Register />} />
        
        <Route path="/login" element={<Login />} />
        {/* <Route
          path="/admin"
          element={
            <PrivateRoute roles={['admin']}>
              <AdminDashboard />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/user"
          element={
            <PrivateRoute roles={['user']}>
              <UserDashboard />
            </PrivateRoute>
          }
        /> */}
        {/* <Route
          path="/user"
          
        /> */}
      </Routes>
    </Router>
    
    
  );
}

export default App;

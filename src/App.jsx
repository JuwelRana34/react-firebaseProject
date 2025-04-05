// src/App.js
// import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Register from './page/Register';
import Login from './page/Login';
import UserDashboard from './page/UserDashboard';
import Home from './page/Home';
import Admin from './page/Admin';
import NavbarMenu from './components/NavbarMenu';
import Notice from './components/Notice';
import Footer from './components/Footer2';
import'./App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAdminCheck from './hooks/useAdminCheck';
import ProfilePhotoUpload from './components/ProfilePhotoUpload';
import Qustions from './page/Qustions';
import ForgotPassword from './components/ForgotPassword ';
import VideoPage from './page/VideoPage';
import RulesAndRegulations from './page/RulesAndRegulations';
import ContactCR from './page/ContactCR';
import ImageGallery from './components/ImageGallery';
import BirthdayWish from './components/BirthdayWish';
import Allstudents from './components/Allstudents';
import ProfileSetup from './page/ProfileSetup';
import Checkuser from './hooks/Checkuser';


function App() {
  
  const {isAdmin,user} = useAdminCheck();


  return (

    <>

    <Router>
        <BirthdayWish/>
      <NavbarMenu/>
      
      <ToastContainer />
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/contactcr" element={<ContactCR/>} />
      <Route path="/forgot-password" element={<ForgotPassword/>} />
      {user&& <>


      <Route path="/Students" element={<Checkuser><Allstudents/> </Checkuser> } />
      <Route path="/videos" element={<Checkuser><VideoPage/></Checkuser>} />
      <Route path="/photos" element={<Checkuser><ImageGallery/></Checkuser>} />
      <Route path="/profile-setup" element={<ProfileSetup/>} />
      <Route path="/notice" element={<Notice/>} />
      
      <Route path="/Qustions" element={<Qustions/>} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/RulesAndRegulations" element={<RulesAndRegulations />} />
      <Route path="/PhotoUpdate" element={<ProfilePhotoUpload />} />
      </>}
      {isAdmin && <Route path="/Admin" element={<Admin />} />}
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Register />} />

      </Routes>

      <Footer/>
      
    </Router>
    </>
    
  );
}

export default App;

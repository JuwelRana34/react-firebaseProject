// src/components/Logout.js
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import {  toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [isLoggedout, setIsLoggedout] = useState(false); 
  const Navigate = useNavigate()

  const notify = () => toast.error('** Logged out succesfully', {
    theme: "colored",
  });


  const handleLogout = async () => {
    try {
      await signOut(auth);
      notify()
      setIsLoggedout(true)
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error(`${error}`)
    }
  };

  if (isLoggedout) {
    return <Navigate to="/" />; // Navigate to the user page if logged in
  }

  return <button className='px-3 py-2 m-2 text-white text-lg font-medium bg-red-500 rounded-lg shadow-lg shadow-red-200 hover:bg-red-600' onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

// src/components/Logout.js
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('Logged out');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;

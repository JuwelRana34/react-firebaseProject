// src/components/Login.js
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Button,  Label, TextInput } from "flowbite-react";
import { Navigate } from 'react-router-dom';
import {  toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const notify = () => toast.success('🦄 Login succesfully', {
    position: "top-right",
    theme: "colored",
    
    });



  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true)
      setEmail("")
      setPassword("")
      notify()
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


  if (isLoggedIn) {
    return <Navigate to="/user" />; // Navigate to the user page if logged in
  }

  return (

    <form onSubmit={handleLogin} className="flex md:mx-auto mx-4 max-w-md flex-col gap-4">
     <div>
       <div className="mb-2 block">
         <Label htmlFor="email1" value="Your email" />
       </div>
       <TextInput id="email1" type="email" placeholder="name@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
     </div>
     <div>
       <div className="mb-2 block">
         <Label htmlFor="password1" value="Your password" />
       </div>
       <TextInput id="password1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
     </div>
     {/* <div className="flex items-center gap-2">
       <Checkbox id="remember" />
       <Label htmlFor="remember">Remember me</Label>
     </div> */}
     <Button className='bg-green-radial' type="submit">Login</Button>
   </form>
    
     
    
  );
};

export default Login;









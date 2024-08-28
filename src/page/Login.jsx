// src/components/Login.js
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Button,  Label, TextInput } from "flowbite-react";
import { Link, Navigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { Player } from '@lottiefiles/react-lottie-player';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  const notify = () => toast.success('🦄 Login succesfully', {
    position: "top-right",
    theme: "colored",
    });

    const notifyEmailVerification = () => toast.warning('Please verify your email before logging in.', {
      position: "top-right",
      theme: "colored",
    });


  const handleLogin = async (e) => {

    e.preventDefault();
    // try {
    //   await signInWithEmailAndPassword(auth, email, password);
    //   setIsLoggedIn(true)
    //   setEmail("")
    //   setPassword("")
    //   notify()
    // } catch (error) {
    //   console.error('Error logging in:', error);
    //   toast.error(`${error}`)
    // }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user.emailVerified) {
        setIsLoggedIn(true);
        setEmail("");
        setPassword("");
        notify();
      } else {
        notifyEmailVerification();
        auth.signOut();  // Sign out the user if their email is not verified
      } } catch (error) {
        console.error('Error logging in:', error);
        toast.error(`Error: ${error.message}`);
      }

  };


  if (isLoggedIn) {
    return <Navigate to="/user" />; // Navigate to the user page if logged in
  }

  return (
    <>
    <Player
     src='https://lottie.host/3030bf88-6f29-48ee-b731-1e18dd360367/sWO6FhFAMD.json'
     loop
     autoplay
     className="player"
    />
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
     <Button className='bg-green-radial rounded-md' type="submit">Login</Button>
   <Link to="/forgot-password" className='text-blue-600  hover:underline text-end'> Forgotten password? </Link>
   <hr />
   <Link to="/registration" className='bg-lime-600   text-center py-3 rounded-md text-white mb-2'> Create new account </Link>
   </form>
      <div>
          
      </div>
  </>
     
    
  );
};

export default Login;









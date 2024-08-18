// src/Register.js
import { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Button, Label, TextInput } from "flowbite-react";
import {  toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [fbLink, setfbLink] = useState('');
  const [HomeDistic, setHomeDistic] = useState('');
  const [registration, setRegistration] = useState(false);

  
  const totify = () => toast.error('user alreay register please login !', {
    position: "top-right",
    theme: "colored",
    });

    const emailVerificationNotify = () => toast.info('🦄 Registration succesfully! Please check your email to verify your account.', {
      position: "top-right",
      theme: "colored",
    });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email,
        name,
        phone,
        bloodGroup,
        fbLink,
        HomeDistic,
        role: 'user'
      });
      await sendEmailVerification(user);
      emailVerificationNotify();
      setRegistration(true)
 
    } catch (error) {
      totify()
      setRegistration(true)
    }
  };

  if(registration){
    return <Navigate to="/login"/>
  }


  return (
    <>
    <h1 className='w-[80%] p-3 mb-5 bg-gradient-to-r from-blue-400 to-cyan-600 text-white text-xl font-semibold shadow-lg rounded-md mx-auto text-center '>Registration Form</h1>
    <form onSubmit={handleRegister} className="flex mx-3 md:mx-auto justify-center max-w-md flex-col gap-0">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value='Name '  />
        </div>
        <TextInput id="name" type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Your email" />
        </div>
        <TextInput id="email" type="email" placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)}  required />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="Phone" value="Your number" />
        </div>
        <TextInput id="phone" type="number" placeholder='Namber' value={phone} onChange={(e) => setPhone(e.target.value)}  required />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="Blood Group" value="Your Blood Group" />
        </div>
        <TextInput id="Blood Group" type="text" placeholder='ex: B+,O-' value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="facebook link" value="facebook link" />
        </div>
        <TextInput id="facebook link" type="text" placeholder="https://www.facebook.com/xxx" value={fbLink} onChange={(e) => setfbLink(e.target.value)}  required />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="HomeDistic" value="Your Home Distic" />
        </div>
        <TextInput id="HomeDistic" type="text" placeholder=' your Home distic' value={HomeDistic} onChange={(e) => setHomeDistic(e.target.value)} required />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" placeholder='*****' value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
     
      <Button className=' mt-3 bg-green-radial text-lg font-medium rounded-md' type="submit">Register</Button>


      <div className='flex items-center my-2 justify-center '>
        <hr className=' border-[1px]  w-[20%] md:w-[30%] border-gray-300' /> 
        <p className='mx-2 text-gray-400'>Have you account?</p>
        <hr className='border-[1px] w-[20%] md:w-[30%] border-gray-300' />
      </div>

      <Link to="/login" className='bg-blue-700 text-white py-1 my-2 rounded-md text-center text-lg font-medium'> Login </Link>
    </form>

     </>
  );
}

export default Register;

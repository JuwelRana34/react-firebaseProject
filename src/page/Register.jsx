// src/Register.js
import { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Button, Label, TextInput } from "flowbite-react";
import {  toast } from 'react-toastify';
import { Navigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [fbLink, setfbLink] = useState('');
  const [registration, setRegistration] = useState(false);


  const notify = () => toast.success('🦄 Registration succesfully', {
    position: "top-right",
    theme: "colored",
    });
  const totify = () => toast.error('user alreay register please login !', {
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
        role: 'user'
      });
      setRegistration(true)
      notify()
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
    <form onSubmit={handleRegister} className="flex max-w-md flex-col gap-0">
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
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput id="password1" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
     
      <Button className=' bg-green-radial' type="submit">Register</Button>
    </form>
    
     </>
  );
}

export default Register;

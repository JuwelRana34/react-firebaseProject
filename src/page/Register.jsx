// src/Register.js
import { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [fbLink, setfbLink] = useState('');

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

      console.log('User registered successfully');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /> <br />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} /> <br />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} /> <br />
      <input type="text" placeholder="Blood Group" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} /> <br />
      <input type="text" placeholder="facebook link" value={fbLink} onChange={(e) => setfbLink(e.target.value)} /> <br />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;

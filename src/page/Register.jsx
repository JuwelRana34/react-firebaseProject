// src/Register.js
import { useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { Button, Label, TextInput} from "flowbite-react";
import {  toast } from 'react-toastify';
import { Link, Navigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



const locations = [
  "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Jamalpur", "Kishoreganj",
  "Madaripur", "Manikganj", "Munshiganj", "Mymensingh", "Narayanganj",
  "Narsingdi", "Netrokona", "Rajbari", "Shariatpur", "Sherpur", "Tangail",
  "Bogra", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna",
  "Rajshahi", "Sirajgonj", "Dinajpur", "Gaibandha", "Kurigram",
  "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon",
  "Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur",
  "Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla",
  "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali",
  "Rangamati", "Habiganj", "Maulvibazar", "Sunamganj", "Sylhet",
  "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna",
  "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"
];

const Batchs = [ "17th" , "18th" , "19th"]

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [batch, setBatch] = useState('');
  const [fbLink, setfbLink] = useState('');
  const [registration, setRegistration] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [gender, setGender] = useState(''); // New state for gender
  const [dob, setDob] = useState(new Date()); // New state for Date of Birth


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
        batch,
        fbLink,
        selectedLocation,
        gender,
        dob,
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

      {/* <div>
        <div className="mb-2 block">
          <Label htmlFor="Blood Group" value="Your Blood Group" />
        </div>
        <TextInput id="Blood Group" type="text" placeholder='ex: B+,O-' value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required />
      </div> */}


<div>
          <div className="mb-2 block">
            <Label htmlFor="dob" value="Date of Birth" />
          </div>
          <DatePicker
            selected={dob}
            onChange={(date) => setDob(date)}
            dateFormat="dd/MM/yyyy"
            className="w-full p-2 border rounded-md"
            maxDate={new Date()} // Prevent future dates
            showYearDropdown
            scrollableYearDropdown
            required
          />
        </div>




      <div>
        <div className="mb-2 block">
          <Label htmlFor="facebook link" value="facebook link" />
        </div>
        <TextInput id="facebook link" type="text" placeholder="https://www.facebook.com/xxx" value={fbLink} onChange={(e) => setfbLink(e.target.value)}  required />
      </div>


      <div className="my-4 ">
          <div className="mb-2 block">
            <Label htmlFor="gender" value="Gender" />
          </div>
          <div>
            <label className="inline-flex items-center">
              <input type="radio" value="Male" checked={gender === 'Male'} onChange={() => setGender('Male')} className="form-radio" />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center ml-4">
              <input type="radio" value="Female" checked={gender === 'Female'} onChange={() => setGender('Female')} className="form-radio" />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>


      <label className='my-4 font-medium'>
        HomeDistict:
        <select className='mx-2'
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          required
        >
          <option  value="">Select your HomeDistict</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
      </label>

      <label className='my-4 font-medium'>
        Batch:
        <select className='mx-2'
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
          required
        >
          <option  value="">Select your Batch</option>
          {Batchs.map((Batch, index) => (
            <option key={index} value={Batch}>{Batch}</option>
          ))}
        </select>
      </label>


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

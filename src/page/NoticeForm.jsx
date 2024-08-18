// src/components/NoticeForm.js
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Label, Textarea,TextInput  } from "flowbite-react";
import { Button } from "flowbite-react";
import {  toast } from 'react-toastify';

const NoticeForm = () => {
  const [notice, setNotice] = useState('');
  const [title, setTitle]= useState('') 

  const notify = () => toast.info('🦄 NOtice post succesfully', {
    position: "top-right",
    theme: "colored",
    });



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, 'notices'), {
        text: notice,
        title:title, 
        createdAt: new Date()

      });

      setNotice(' ');
      setTitle(' ')
      notify()
      window.onload()
    } catch (error) {
      console.error('Error posting notice:', error);
    }
  };


  return (
    <>
    
            <h1 className=' w-[80%] md:w-[60%] p-3 mt-5 bg-gradient-to-r from-blue-400 to-cyan-600 text-white text-xl font-semibold shadow-lg rounded-md mx-auto text-center'>Notice</h1>
    <form onSubmit={handleSubmit}>
      {/* <textarea value={notice} onChange={(e) => setNotice(e.target.value)} placeholder="Write your notice here" required></textarea>
      <button type="submit">Post Notice</button> */}
        
    <div className="max-w-md mx-auto text-center p-5">
    <div className="mb-2 block">
          <Label htmlFor="base" value="Notice Title" />
        </div>
        <TextInput id="base" type="text" placeholder='Write Your Notice Title' sizing="md" value={title} onChange={(e) => setTitle(e.target.value)}  required />

    <div className="mb-2 block">
      <Label className=' text-base text-start' htmlFor="comment" value="Notice for users" />
    </div>
    <Textarea id="comment" className=' resize-none' onChange={(e) => setNotice(e.target.value)} value={notice}  placeholder="Write a notice" required rows={4} />
   
    <Button className='my-2 bg-green-radial ' type="submit" color="blue">Post Notice</Button>
    </div>
    
    </form>



  </>
  );
};

export default NoticeForm;

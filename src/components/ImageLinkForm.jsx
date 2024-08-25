import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firestore database instance
import { toast } from 'react-toastify';

function ImageLinkForm() {
  const [imageLink, setImageLink] = useState('');
  const [description, setDescription] = useState(''); // New state for description

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageLink && description) { // Ensure both fields are filled
      try {
        // Add the image link and description to Firestore
        await addDoc(collection(db, "images"), {
          link: imageLink,
          description: description,
          timestamp: new Date(),
        });
        setImageLink(''); // Clear the image link input field after successful submission
        setDescription(''); // Clear the description input field after successful submission
        toast.success("image post success!")
      } catch (error) {
        console.error("Error adding document: ", error);
        toast.error(error)
      }
    }
  };

  return (
<>
    <h1 className=' w-[80%] md:w-[60%] p-3 my-5 bg-gradient-to-r from-blue-400 to-cyan-600 text-white text-xl font-semibold shadow-lg rounded-md mx-auto text-center'>  Post Event image </h1>
    <form onSubmit={handleSubmit} className='mx-auto text-center'>
      <input className='m-2'
        type="text"
        value={imageLink}
        onChange={(e) => setImageLink(e.target.value)}
        placeholder="Enter Facebook Image Link"
      />
      <input className='m-2'
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Image Description"
      /> <br />
      <button className='btn  btn-primary m-2' type="submit">Submit</button>
    </form>
    </>
  );
}

export default ImageLinkForm;

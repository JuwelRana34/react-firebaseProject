// src/components/PostVideo.js
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';

function PostVideo() {
  const [videoLink, setVideoLink] = useState('');
  const [videoheader, setvideoheader] = useState('');

  const handleAddVideo = async () => {
    try {
      if (videoLink.trim()) {
        await addDoc(collection(db, 'videos'), {
          link: videoLink,
          header: videoheader,
          createdAt: new Date()
        });
        setVideoLink(''); // Clear the input
        setvideoheader('')
        toast.success('Video added successfully!');
      }
    } catch (error) {
      console.error("Error adding video: ", error);
      toast.error(`${error}`)
    }
  };

  return (
    <div className='my-10' >

     <h1 className=' w-[80%] md:w-[60%] p-3 my-5 bg-gradient-to-r from-blue-400 to-cyan-600 text-white text-xl font-semibold shadow-lg rounded-md mx-auto text-center'>  Post Event video </h1>
  <div className=' w-[95%] md:w-[80%] mx-auto text-center my-8'>

      
      <input
        type="text"
        placeholder="Enter YouTube Video Link"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        className="border p-2 mr-2"
      />
      
      <input
        type="text"
        placeholder="Enter YouTube Video videoheader"
        value={videoheader}
        onChange={(e) => setvideoheader(e.target.value)}
        className="border p-2 mr-2 my-3"
      /> 
      <button onClick={handleAddVideo} className="font-medium text-white bg-blue-500 py-2 px-3 rounded-md hover:bg-blue-600">
        Add Video
      </button>

      </div>

    </div>
  );
}

export default PostVideo;

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
    }
  };

  return (
    <div>
      <h2>Post YouTube Video</h2>
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
        className="border p-2 mr-2"
      />
      <button onClick={handleAddVideo} className="font-medium text-white bg-blue-400 py-2 px-3 rounded-md hover:bg-blue-500">
        Add Video
      </button>
    </div>
  );
}

export default PostVideo;

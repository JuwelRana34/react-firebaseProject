// src/components/VideoPage.js
import { useEffect, useState } from 'react';
import { collection, getDocs ,query, orderBy  } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Card } from "flowbite-react";


function VideoPage() {
  const [videos, setVideos] = useState([]);


   // Fetch all videos and sort them by createdAt
   const fetchVideos = async () => {
    const videosQuery = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
    const videosSnapshot = await getDocs(videosQuery);
    setVideos(videosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() })));
  };

  useEffect(() => {
    fetchVideos();
  }, []);


  function getYouTubeVideoId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?v%3D|watch\?.+&v=|watch\?v%3D)([^"&?/\s]{11})/;
    const match = url.match(regExp);
    return match ? match[2] : null;
  }

  // delete button 
 


  return (
    <div>
      <h2 className='w-[80%] p-3 mb-5 bg-gradient-to-r from-blue-400 to-cyan-600 text-white text-xl font-semibold shadow-lg rounded-md mx-auto text-center'>
        events videos
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

        {videos.map((video, index) => {
          const videoId = getYouTubeVideoId(video.link);
          return (
            <>
            <Card key={index}
                    className="max-w-sm mx-auto" >  
          <iframe
               width="100%"
                 height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
               allowFullScreen
               ></iframe>

              <h5 className="text-xl font-bold tracking-tight text-blue-600 dark:text-white">
              <h1>{video.header}</h1>
              <p className="text-base text-gray-500">{video.createdAt?.toLocaleDateString()}</p>
              </h5>
      
    </Card>

    </>

          );
        })}
      </div>
    </div>
  );
}

export default VideoPage;

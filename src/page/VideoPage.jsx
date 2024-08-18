// src/components/VideoPage.js
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function VideoPage() {
  const [videos, setVideos] = useState([]);

  // Fetch all videos
  const fetchVideos = async () => {
    const videosSnapshot = await getDocs(collection(db, 'videos'));
    setVideos(videosSnapshot.docs.map(doc => doc.data()));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Function to extract YouTube video ID from the URL
  const getYouTubeVideoId = (url) => {
    const urlObj = new URL(url);
    return urlObj.searchParams.get("v");
  };

  return (
    <div>
      <h2>Posted Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => {
          const videoId = getYouTubeVideoId(video.link);
          return (
            <div key={index} className="video-wrapper">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <h1>{video.header}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default VideoPage;

import  { useState, useEffect } from 'react';
import { db } from '../firebaseConfig'; // Adjust the path as needed
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const DisplayPhotos = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const q = query(collection(db, 'photos'), orderBy('timestamp', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedPhotos = querySnapshot.docs.map(doc => doc.data());
        setPhotos(fetchedPhotos);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    fetchPhotos();
  }, []);

  const getFileIdFromLink = (link) => {
    // Regex to extract the file ID from Google Drive link
    const regex = /\/d\/([a-zA-Z0-9_-]+)\//;
    const match = link.match(regex);
    const fileId = match ? match[1] : null;
    console.log('Extracted File ID:', fileId); // Debugging: log the file ID
    return fileId;
  };

  return (
    <div>
      <h2>Uploaded Photos</h2>
      <div className="photo-grid">
        {photos.map((photo, index) => {
          const fileId = getFileIdFromLink(photo.driveLink);

          if (!fileId) {
            return (
              <div key={index} className="photo-item">
                <p>Invalid link: {photo.driveLink}</p>
              </div>
            );
          }

          const embedLink = `https://drive.google.com/uc?export=view&id=${fileId}`;
          console.log('Embed Link:', embedLink); // Debugging: log the embed link

          return (
            <div key={index} className="photo-item">
              <img
                src={embedLink}
                alt={`Photo ${index + 1}`}
                onError={() => console.error('Error loading image:', embedLink)} // Debugging: log load error
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DisplayPhotos;

import  { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';

const DisplayPhotos = () => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const querySnapshot = await getDocs(collection(db, "links"));
      const linksData = querySnapshot.docs.map(doc => doc.data());
      setLinks(linksData);
    };

    fetchLinks();
  }, []);

  const extractImageId = (url) => {
    const match = url.match(/[-\w]{25,}/);
    return match ? match[0] : null;
  };

  return (
    <div>
      {links.map((link, index) => {
        const imageId = extractImageId(link.url);

        const thumbnailUrl = `https://drive.google.com/thumbnail?id=${imageId}`;
        const thumbnailUrl2 = `https://drive.google.com/uc?export=view&id=$${imageId}`;
        return (
          <div key={index}>
            <img src={thumbnailUrl2} alt="" />
            {imageId && <img src={thumbnailUrl} alt="Thumbnail" />}
            
          </div>
        );
      })}
    </div>
  );
};

export default DisplayPhotos;

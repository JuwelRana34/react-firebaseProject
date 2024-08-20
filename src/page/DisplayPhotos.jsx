import  { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebaseConfig';
import ImageGallery from '../components/ImageGallery';

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
        // const thumbnailUrl2 = `https://drive.google.com/uc?export=view&id=$${imageId}`;
        return (
          <>
         

    <div key={index} className="card card-compact bg-base-100 w-96 shadow-lg my-10">
  {/* <figure> */}
    <img className='p-2'
      src={thumbnailUrl}
      alt="photo" />
  {/* </figure> */}
  <div className="card-body">
    <h2 className="card-title ">Shoes!</h2>

    
  </div>
    </div>
          
          </>
        );
      })}

      <ImageGallery/>
    </div>
  );
};

export default DisplayPhotos;

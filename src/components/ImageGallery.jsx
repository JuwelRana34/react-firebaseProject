import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Import your Firestore database instance
import { Card, Button } from "flowbite-react";
import useAdminCheck from "../hooks/useAdminCheck"

function ImageGallery() {
  const [images, setImages] = useState([]);
  const {isAdmin} = useAdminCheck(); // Replace with your actual admin check logic

  useEffect(() => {
    const fetchImages = async () => {
      const q = query(collection(db, "images"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const imageList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setImages(imageList);
    };

    fetchImages();
  }, []); // Empty dependency array means this effect runs once on mount

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "images", id));
      setImages(images.filter((image) => image.id !== id)); // Remove the deleted image from the state
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  return (
    <div className='p-3 grid lg:grid-cols-3 gap-4'>
      {images.map((image) => (
        <Card
          key={image.id}
          className="max-w-sm"
          imgAlt={image.description}
          imgSrc={image.link}
        >
          <p className="font-medium text-gray-700 dark:text-gray-400">
            {image.description}
          </p>
          {isAdmin && (
            <Button color="failure" onClick={() => handleDelete(image.id)}>
              Delete
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
}

export default ImageGallery;

import { db } from '../firebaseConfig';
import { useState, useEffect } from "react";
import { collection, query, orderBy, getDocs } from 'firebase/firestore'; // Modular imports for Firebase
import { Card } from "flowbite-react";
import { MdOutlineError } from "react-icons/md";


function ImageGallery() {
  const [images, setImages] = useState([]); // State to store images
  const [loading, setLoading] = useState(true); // Loading state

  // Function to fetch images with a query (order by timestamp)
  const fetchImages = async () => {
    setLoading(true);

    try {
      // Create a Firestore query to fetch images in descending order of timestamp
      const q = query(collection(db, "images"), orderBy("timestamp", "desc"));

      // Execute the query
      const querySnapshot = await getDocs(q);

      // Map through the documents and get image URLs and headings
      const imageList = querySnapshot.docs.map(doc => ({
        url: doc.data().url,
        heading: doc.data().heading // Fetch the heading along with the image URL
      }));

      setImages(imageList); // Set the fetched images and headings in state
      setLoading(false); // Stop loading
    } catch (error) {
      console.error("Error fetching images:", error);
      setLoading(false); // Stop loading if error occurs
    }
  };

  // Fetch images when the component loads
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="App">
      <h1  className=' w-[80%] md:w-[60%] p-3 my-5 bg-gradient-to-r from-blue-400 to-cyan-600 text-white text-xl font-semibold shadow-lg rounded-md mx-auto text-center'>Our Photo Gallery</h1>

      { /*Display loading state */}
      {loading ? <h3>Loading images...</h3> : null}

      {/* Display fetched images */}
      <div className="grid md:grid-cols-3 px-2 md:px-0 justify-items-center space-y-5 mx-auto  space-x-3">
        {images.length > 0 ? (
          images.map((image, index) => (
    <Card
      className="max-w-sm" key={index}
      imgAlt={`Uploaded ${index}`}
      imgSrc={image.url}
    >
      <p className="  text-justify font-bold tracking-tight text-gray-700 dark:text-white">
      {image.heading}
      </p>
      
    </Card>))) : (
          !loading && <p className=' text-white py-5 rounded-md bg-orange-400 w-5/6 text-center mx-auto'> <MdOutlineError className='h-5 w-5 items-center inline mx-2' />No images found!</p>
        )}
      </div>
    </div>
  );
}

export default ImageGallery;

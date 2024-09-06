import { useState } from "react";
import axios from "axios";
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebaseConfig'; // Import Firebase config (Firestore)
import { toast} from "react-toastify";
import { Button, Spinner } from "flowbite-react";

function PostDriveLink() {
  const [image, setImage] = useState("");
  const [heading, setHeading] = useState(""); // State to store the image heading
  const [loading, setLoading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleHeadingChange = (e) => {
    setHeading(e.target.value); // Set the image heading from the input field
  };

  const handleUpload = async () => {
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "my_unsigned_preset");
    formData.append("cloud_name", "dbwbwwteo");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dbwbwwteo/image/upload",
        formData
      );
      const imageUrl = res.data.secure_url;

      // Save the URL and heading to Firestore
      await addDoc(collection(db, "images"), {
        url: imageUrl,
        heading: heading, // Store the image heading
        timestamp: new Date(), // Optional: Add a timestamp
      });

      setUploadedUrl(imageUrl);
      setLoading(false);
      setHeading('')
      setImage("");
      toast.success("Photo Upload Successfully!");
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error(err)
    }
  };

  return (
    <div className="App">
      <h1  className=' w-[80%] md:w-[60%] p-3 my-5 bg-gradient-to-r from-blue-400 to-cyan-600 text-white text-xl font-semibold shadow-lg rounded-md mx-auto text-center'>Upload Image</h1>

      {/* upload image  to Cloudinary */}

<div className=" w-5/6  mx-auto text-center space-y-4 my-5">
      <input className="border border-gray-500" type="file" onChange={handleImageChange} value={image ? undefined : ""}/> {/* Input for image */}
      <input
        type="text"
        placeholder="Enter image heading"
        value={heading}
        onChange={handleHeadingChange}
      /> {/* Input for image heading */}
      
      <button onClick={handleUpload}  className="btn-grad inline-block">Upload Image</button>
</div>
      {loading ? <div className="my-3 text-center" >
      <Spinner aria-label="Alternate spinner button example" size="lg" />
      <span className="pl-4 text-lg text-green-500 ">Uploading...</span>
      </div> : ""}
      
    </div>
  );
}

export default PostDriveLink;

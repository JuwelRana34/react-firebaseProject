import  { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { toast } from 'react-toastify';

const PostDriveLink = () => {
  const [link, setLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "links"), { url: link });
      setLink("");
      toast.success("post success!")
    } catch (e) {
      console.error("Error adding document: ", e);
      toast.error(e)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Enter Google Drive link"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default PostDriveLink;

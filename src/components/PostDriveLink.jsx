import  { useState } from 'react';
import { db } from '../firebaseConfig'; // Adjust the path to your Firebase configuration file
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const PostDriveLink = () => {
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (link) {
      try {
        // Add the link to Firestore with a timestamp
        await addDoc(collection(db, 'photos'), {
          driveLink: link,
          timestamp: serverTimestamp(),
        });
        console.log('Link added successfully');
        setLink(''); // Clear the input after submission
      } catch (error) {
        console.error('Error adding link:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Google Drive Photo Link:
        <input
          type="url"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="https://drive.google.com/file/d/FILE_ID/view"
        />
      </label>
      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Post Link
      </button>
    </form>
  );
};

export default PostDriveLink;

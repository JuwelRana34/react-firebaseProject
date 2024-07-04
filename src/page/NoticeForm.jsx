// src/components/NoticeForm.js
import { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const NoticeForm = () => {
  const [notice, setNotice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const time = new Date()
    try {
      await addDoc(collection(db, 'notices'), {
        text: notice,
        createdAt: new Date(),
        time
      });
      setNotice('');
      console.log('Notice posted');
    } catch (error) {
      console.error('Error posting notice:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={notice} onChange={(e) => setNotice(e.target.value)} placeholder="Write your notice here" required></textarea>
      <button type="submit">Post Notice</button>
    </form>
  );
};

export default NoticeForm;

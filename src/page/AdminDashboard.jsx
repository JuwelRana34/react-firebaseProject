// src/components/AdminDashboard.js
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db} from '../firebaseConfig';
import NoticeForm from './NoticeForm';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [Notice, setNotice] = useState([]);

 
  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
    const fetchUNotice = async () => {
      const usersSnapshot = await getDocs(collection(db, 'notices'));
      setNotice(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchUNotice();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleString(); // Adjust formatting as needed
  };

  return (
  
    <div>
      <h1>Admin Dashboard</h1>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
      <ul>
        {Notice.map(notics => (
          <div key={notics.id}>
            <p>{notics.text}</p>
            <p>Posted on: {formatDate(new Date(notics.createdAt.seconds * 1000))}</p>
          </div>
          
        ))}
      </ul>
      <h2>Post a Notice</h2>
      <NoticeForm />
    </div>
  );
};

export default AdminDashboard;

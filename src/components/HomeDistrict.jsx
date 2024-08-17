import  { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // import Firestore db from firebase config

function HomeDistrict() {
  const [homeDistric, setHomeDistric] = useState('');
  const [users, setUsers] = useState([]);

  const handleDistrictChange = (e) => {
    setHomeDistric(e.target.value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      let q;

      if (homeDistric) {
        q = query(collection(db, "users"), where("HomeDistic", "==", homeDistric));
      } else {
        q = query(collection(db, "users"));
      }

      const querySnapshot = await getDocs(q);
      const userList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));

      setUsers(userList);
    };

    fetchUsers();
  }, [homeDistric]);

  return (
    <div>
      <select value={homeDistric} onChange={handleDistrictChange}>
        <option value="">All Districts</option>
        <option value="Bogura">Bogura</option>
        <option value="Los Angeles">Los Angeles</option>
        <option value="Chicago">Chicago</option>
        {/* Add more options as needed */}
      </select>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.homeDistric}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomeDistrict;

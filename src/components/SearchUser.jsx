import  { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Ensure this is the correct path to your Firebase setup file
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Card } from 'flowbite-react'; // Adjust if using a different component library


function SearchUser() {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        const usersList = [];
        snapshot.forEach(doc => {
          usersList.push({ id: doc.id, ...doc.data() });
        });
        setUsers(usersList);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const fetchUserDetails = async () => {
          const userRef = collection(db, 'users');
          const userDoc = await getDocs(userRef);
          const userData = userDoc.docs.find(doc => doc.id === user.uid);
          if (userData) {
            setCurrentUser({ id: user.uid, ...userData.data() });
          }
        };

        fetchUserDetails();
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (searchTerm.trim() !== '') {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = users.filter(user => 
        user.name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, users]);

  const canViewPhone = (userGender) => {
    return currentUser && currentUser.gender === userGender;
  };

  const renderProfileCard = (user) => {
    const { profilePhotoURL, name, email, phone, batch, selectedLocation, fbLink } = user;

    return (
      <Card className="w-[95%] md:max-w-sm mx-auto shadow-lg my-4 shadow-indigo-300 bg-gradient-to-bl from-indigo-400" key={user.id}>
        
        {/* Image of profile */}
        <div className="flex flex-col items-center pb-10">
          <img 
            src={profilePhotoURL || '/default-profile.png'} 
            alt="Profile" 
            className="mb-3 rounded-full shadow-lg ring-2 ring-white h-32 w-32 md:h-40 md:w-40" 
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
          <span className="text-sm text-indigo-700 dark:text-white">{email}</span>
          <div className="mt-4 mx-auto text-center space-x-3 lg:mt-6">
            <a
              href={fbLink}
              className="inline-flex items-center rounded-lg bg-indigo-600 my-3 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Facebook
            </a>
            <table className="border-collapse border border-indigo-700">
              <tbody>
                <tr>
                  <td className="border border-indigo-400">Phone:</td>
                  <td className="border border-indigo-400 px-2">
                    {canViewPhone(user.gender) ? phone : 'Hidden'}
                  </td>
                </tr>
                <tr>
                  <td className="border border-indigo-400">Batch:</td>
                  <td className="border border-indigo-400 px-2 text-red-700 font-medium">{batch}</td>
                </tr>
               
                <tr>
                  <td className="border border-indigo-400">Home District:</td>
                  <td className="border border-indigo-400 px-2 uppercase">{selectedLocation}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className=' md:w-1/2 mx-auto my-5 text-center '>
      <label htmlFor="input" className='text-green-500 my-4 inline-block font-semibold text-xl'> type student name for quick contact: </label> <br />
      <input 
        type="text" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        placeholder="Search user by name" 
        name='input'
      />

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {filteredUsers.length > 0 ? (
        filteredUsers.map(user => renderProfileCard(user))
      ) : (
        searchTerm && <p>No matching users found.</p>
      )}
    </div>
  );
}

export default SearchUser;

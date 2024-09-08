import { useState, useEffect } from 'react';
import { db ,auth } from '../firebaseConfig'; // Adjust the path as needed
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { Table ,Alert  } from "flowbite-react";
import profile from "../assets/images/profile.png"

const locations = [
  "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Jamalpur", "Kishoreganj",
  "Madaripur", "Manikganj", "Munshiganj", "Mymensingh", "Narayanganj",
  "Narsingdi", "Netrokona", "Rajbari", "Shariatpur", "Sherpur", "Tangail",
  "Bogra", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna",
  "Rajshahi", "Sirajgonj", "Dinajpur", "Gaibandha", "Kurigram",
  "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon",
  "Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur",
  "Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla",
  "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali",
  "Rangamati", "Habiganj", "Maulvibazar", "Sunamganj", "Sylhet",
  "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna",
  "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"
];

const DisplayUsers = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [users, setUsers] = useState([]);

  const [currentUserGender, setCurrentUserGender] = useState(''); // State to store the current user's gender


  // Function to fetch users based on selected location
  const fetchUsers = async (location) => {
    try {
      const q = query(collection(db, 'users'), where('selectedLocation', '==', location));
      const querySnapshot = await getDocs(q);
      const fetchedUsers = querySnapshot.docs.map(doc => doc.data());
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };



   // Fetch current user's gender
   useEffect(() => {
    const fetchCurrentUserGender = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCurrentUserGender(docSnap.data().gender);
        }
      }
    };

    fetchCurrentUserGender();
  }, []);


  // Fetch users when location changes

  useEffect(() => {
    if (selectedLocation) {
      fetchUsers(selectedLocation);
    } else {
      setUsers([]); // Clear users list when no location is selected
    }
  }, [selectedLocation]);

  return (
    <div className='m-5 text-center mx-auto'> 
      <label className='text-lg font-semibold'>
        Select Location for find student:
        <select className=' mx-2 my-5'
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          <option  value="">Select a location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>{location}</option>
          ))}
        </select>
      </label>

      {selectedLocation && (
        <>
          <h2 className='text-xl my-3' >Student of {selectedLocation}:</h2>
          <ul>

          <div  className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Photo</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Number</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>
              Contact
            </Table.HeadCell>
            <Table.HeadCell>
              Batch
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">

            {users.length > 0 ? (

              users.map((user, index) => (

                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <img src={user.profilePhotoURL || profile } className='h-10 w-10 md:h-16 md:w-16 rounded-full' alt="" />              
              </Table.Cell>
              <Table.Cell className=' capitalize'>{user.name}</Table.Cell>
              <Table.Cell className=' uppercase'> 
                 {/* {user.phone} */}
               
                 {/* Conditionally render phone number based on gender visibility */}
                 {(currentUserGender === 'Male' && user.gender !== 'Female') || (currentUserGender === 'Female' && user.gender !== 'Male') ? user.phone : '******'}
                 </Table.Cell>
              <Table.Cell>
                {/* {user.email} */}
                {/* Conditionally render email based on gender visibility */}
                {(currentUserGender === 'Male' && user.gender !== 'Female') || (currentUserGender === 'Female' && user.gender !== 'Male') ? user.email : '******'}

              </Table.Cell>
              <Table.Cell>
              <a  href={user.fbLink} className="font-medium text-white bg-blue-500 py-2 px-3 rounded-md hover:bg-blue-600 dark:text-cyan-500">
                 Facebook
                </a>
              </Table.Cell>
              <Table.Cell>{user.batch}</Table.Cell>
            </Table.Row> 
              ))
            ) : ( 
              <Alert className='my-2 w-[300px] md:w-auto mx-2 ' color="warning" rounded>
              <span className="font-medium w-full">Info alert!</span> No users found in this location.
            </Alert>
            
            )}
            </Table.Body>
        </Table>
      </div>
          </ul>
        </>
      )}
    </div>
  );
};

export default DisplayUsers;

// src/UserDashboard.js

import { useState, useEffect,useContext } from 'react';
import { db, auth  } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
// import { Table } from "flowbite-react";
import { Card, Dropdown } from "flowbite-react";
import ProfileContext from "../usercontext/ProfileContext.js"
import { NavLink } from 'react-router-dom';


function UserDashboard() {
  const { userId } = useContext(ProfileContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePhotoURL, setProfilePhotoURL] = useState("");

  useEffect(() => {
    const fetchUserData = async (uid) => {
      const userDoc = doc(db, 'users', uid);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        setUserData(userSnapshot.data());
      } else {
        console.log("No such document!");
      }
      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Fetch existing profile photo URL if available
    const fetchProfilePhoto = async () => {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfilePhotoURL(docSnap.data().profilePhotoURL);
      }
    };

    fetchProfilePhoto();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }
const {name, email, role, bloodGroup, phone ,fbLink,HomeDistic}= userData
  return (
    <div>
      <h1 className=' text-xl md:text-2xl w-5/6 mb-4 mx-auto text-center rounded-md py-3 text-white bg-green-400 shadow-lg  shadow-green-300 '>Welcome to your Dashbord <span className=' font-semibold text-[#07273b]' > {name}</span> !</h1>
{/* table  */}

      {/* <div className="overflow-x-auto my-5">
      <Table>
        <Table.Head>
          <Table.HeadCell>name</Table.HeadCell>
          <Table.HeadCell>email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>bloodGroup</Table.HeadCell>
          <Table.HeadCell>uid</Table.HeadCell>
          <Table.HeadCell>update</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {name}
            </Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{role}</Table.Cell>
            <Table.Cell>{bloodGroup}</Table.Cell>
            <Table.Cell>{uid}</Table.Cell>
            
            <Table.Cell>
              <a href="#" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                Edit
              </a>
            </Table.Cell>
          </Table.Row>

        </Table.Body>
      </Table>
    </div> */}

{/* profile  */}
<Card className=" w-[95%] md:max-w-sm mx-auto shadow-lg  my-4 shadow-indigo-300 bg-gradient-to-bl from-indigo-400">
      <div className="flex justify-end px-4 pt-4">
        <Dropdown inline label="">
          <Dropdown.Item>
            <NavLink to="/PhotoUpdate"
             
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
             profile Photo update
            </NavLink>
          </Dropdown.Item>
          
        </Dropdown>
      </div>
      {/* image of profile  */}
      <div className="flex flex-col items-center pb-10">
      <img src={profilePhotoURL} alt="Profile"  className="mb-3 rounded-full shadow-lg ring-2 ring-white h-32 w-32 md:h-40 md:w-40"  />
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
        <span className="text-sm text-indigo-700 dark:text-white">{email}</span>
        <div className="mt-4 mx-auto text-center space-x-3 lg:mt-6">
          <a
            href={fbLink}
            className="inline-flex items-center rounded-lg   bg-indigo-600 my-3 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            facebook
          </a>

          {/* <div className=' text-start'>
            <h1 > <span className=' font-semibold'>Phone: </span> {phone }</h1>
            <h1> <span className=' font-semibold'>bloodGroup:</span>  {bloodGroup}</h1>
            <h1> <span className=' font-semibold'> status: </span>{role}</h1>
            <h1> <span className=' font-semibold'>HomeDistic: </span>  {HomeDistic}</h1>

          </div> */}

        <table className="border-collapse border border-indigo-700 ...">

            <tbody>
              <tr>
                <td className="border  border-indigo-400 ...">Phone:</td>
                <td className="border border-indigo-400 px-2 ...">{phone }</td>
              </tr>
              <tr>
                <td className="border  border-indigo-400 ...">BloodGroup:</td>
                <td className="border border-indigo-400 px-2 text-red-700 font-medium ...">{bloodGroup}</td>
              </tr>
              <tr>
                <td className="border  border-indigo-400 ...">status:</td>
                <td className="border border-indigo-400 px-2 uppercase ...">{role}</td>
              </tr>
              <tr>
                <td className="border  border-indigo-400 ...">HomeDistic:</td>
                <td className="border border-indigo-400 px-2 uppercase ...">{HomeDistic}</td>
              </tr>
              
            </tbody>
        </table>

        </div>
      </div>
      
    </Card>
    

    </div>
  );
}

export default UserDashboard;

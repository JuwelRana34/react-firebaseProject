// src/UserDashboard.js
import LogoutButton from '../components/LogoutButton';
import { useState, useEffect } from 'react';
import { db, auth  } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
// import { Table } from "flowbite-react";
import { Card, Dropdown } from "flowbite-react";

function UserDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }
const {name, email, role, bloodGroup, phone ,fbLink}= userData
  return (
    <div>
      <h1 className=' text-2xl w-5/6 mx-auto text-center rounded-md py-3 text-white bg-green-400 shadow-lg  shadow-green-300 '>Welcome to your <span className=' font-semibold text-[#07273b]' > {name}</span> !</h1>
      <h1>User Dashboard</h1>
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
<Card className="max-w-sm">
      <div className="flex justify-end px-4 pt-4">
        <Dropdown inline label="">
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Edit
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Export Data
            </a>
          </Dropdown.Item>
          <Dropdown.Item>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </a>
          </Dropdown.Item>
        </Dropdown>
      </div>
      {/* image of profile  */}
      <div className="flex flex-col items-center pb-10">
        {/* <Image
          alt="Bonnie image"
          height="96"
          src="/images/people/profile-picture-3.jpg"
          width="96"
          className="mb-3 rounded-full shadow-lg"
        /> */}
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{name}</h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">{email}</span>
        <div className="mt-4 mx-auto text-center space-x-3 lg:mt-6">
          <a
            href={fbLink}
            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            facebook
          </a>

          {/* <a
            href="#"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Message
          </a> */}
          <div className=' text-start'>
            <h1>Phone:{phone}</h1>
            <h1>bloodGroup:{bloodGroup}</h1>
            <h1>status:{role}</h1>
          </div>

        </div>
      </div>
    </Card>
    <button ><LogoutButton/> </button>
    
    </div>
  );
}

export default UserDashboard;

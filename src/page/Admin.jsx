// src/components/Admin.js
import { useEffect, useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import { Accordion } from "flowbite-react";
import NoticeForm from '../page/NoticeForm'
// import UploadPDF from '../components/UploadPDF';
import { Table } from "flowbite-react";
import profile from "../assets/images/profile.png"
// import { deleteUser } from "firebase/auth";
import { deleteDoc } from "firebase/firestore";
import PostVideo from '../components/PostVideo';
// import PostDriveLink from '../components/PostDriveLink';
import ImageLinkForm from '../components/ImageLinkForm';
import PostPDF from '../components/PostPDF';




function Admin() {

  const [user, loading, error ] = useAuthState(auth);
  const [adminData, setAdminData] = useState(null);
  const [users, setUsers] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);


  // user delet 
  const handleDelete = async (userId) => {
    try {
      // Delete the user document from Firestore
      await deleteDoc(doc(db, 'users', userId));

       // Delete the user from Firebase Authentication
      // const userToDelete = await auth.getUser(userId);
      // if (userToDelete) {
      //   await deleteUser(userToDelete);
      // }

      // Optionally, refresh the user list
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };
 
//   fatch admin data 
useEffect(() => {
    const fetchUserData = async (uid) => {
      const userDoc = doc(db, 'users', uid);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        setAdminData(userSnapshot.data());
      } else {
        console.log("No such document!");
      }
    //   setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        // setLoading(false);

      }
    });

    return () => unsubscribe();
  }, []);
//   fatch all users 
    useEffect(()=>{
        
        const fetchUsers = async () => {
            const usersSnapshot = await getDocs(collection(db, 'users'));
            setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
          };
          fetchUsers();
    },[])

//   admin checker
  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };
    checkAdmin();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!isAdmin) return <div>Access Denied you are not admin 😈</div>;

  return (
    <div >
       <h1 className=' text-xl md:text-2xl w-5/6 mb-4 mx-auto text-center rounded-md py-3 text-white bg-green-400 shadow-lg  shadow-green-300 '>Welcome to Admin Dashboard <span className=' font-semibold text-[#07273b]' > {adminData.name}</span> !</h1>
      {/* <h1 className='text-xl text-center'> Welcome to Admin Dashboard {adminData.name} </h1> */}
   
        {/* <Notice/> */}
        <NoticeForm/>
      {/* upload pdf  */}
        {/* <UploadPDF/> */}
     
        <PostPDF/>


    {/* Video Section */}
    <PostVideo/>

    {/* <PostDriveLink/> */}

    <ImageLinkForm/>

    {/* ++++++++++++++++++++ users +++++++++++++++++++++++++++ */}

    <Accordion collapseAll className='mx-3'>

      <Accordion.Panel>
        <Accordion.Title className='text-green-500'>You want to see users? just click on it.</Accordion.Title>
        <Accordion.Content>
        <div key={user.id} className="overflow-x-auto my-5">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Photo</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>role</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>batch</Table.HeadCell>
            <Table.HeadCell>
              Contact
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">

      {users.map(user => (

            <Table.Row key={user.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                <img src={user.profilePhotoURL || profile } className='h-10 w-10 md:h-16 md:w-16 rounded-full' alt="" />              
              </Table.Cell>
              <Table.Cell className=' capitalize'>{user.name}</Table.Cell>
              <Table.Cell className=' uppercase'>  {user.role} </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.batch}</Table.Cell>
              <Table.Cell>
                <button  onClick={() => handleDelete(user.id)} className="font-medium text-white bg-red-400 py-2 px-3 rounded-md hover:bg-red-500 dark:text-cyan-500">
                 Delete
                </button>
              </Table.Cell>
            </Table.Row>

        ))}

    </Table.Body>
        </Table>
      </div>

        </Accordion.Content>
      </Accordion.Panel>

    </Accordion>
    {/* +++++++++++++++++++++++++++++++++++++++++++++++ */}


    





    </div>
  );
}

export default Admin;

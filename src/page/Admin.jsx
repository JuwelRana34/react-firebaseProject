// src/components/Admin.js
import { useEffect, useState} from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
// import Notice from '../components/Notice';
import NoticeForm from '../page/NoticeForm'
import UploadPDF from '../components/UploadPDF';
import { Table } from "flowbite-react";
import profile from "../assets/images/profile.png"
import { deleteUser } from "firebase/auth";
import { deleteDoc } from "firebase/firestore";



function Admin() {

  const [user, loading, error ] = useAuthState(auth);
  const [adminData, setAdminData] = useState(null);
  const [users, setUsers] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);


  // user delet 
  const handleDeleteUser = async (uid) => {
    try {
      // Delete user from Firestore
      await deleteDoc(doc(db, 'users', uid));
  
      // Get the user's Auth user object
      const user = auth.currentUser;
  
      if (user) {
        // Delete user from Firebase Authentication
        await deleteUser(user);
        alert('User deleted successfully');
      } else {
        alert('Failed to delete user');
      }
  
      // Refresh the users list after deletion
      const usersSnapshot = await getDocs(collection(db, 'users'));
      setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert('Error deleting user');
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
      <h1> Welcome to Admin Dashboard {adminData.name} </h1>
        {/* <li key={user.id}>{user.email}</li> */}


        <div key={user.id} className="overflow-x-auto">
        <Table striped>
          <Table.Head>
            <Table.HeadCell>Photo</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>role</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
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
              <Table.Cell>
                <button  onClick={() => handleDeleteUser(user.id)} className="font-medium text-white bg-red-400 py-2 px-3 rounded-md hover:bg-red-500 dark:text-cyan-500">
                 delet
                </button>
              </Table.Cell>
            </Table.Row>

        ))}

  </Table.Body>
        </Table>
      </div>




        {/* <Notice/> */}
        <NoticeForm/>

        <UploadPDF/>
    </div>
  );
}

export default Admin;

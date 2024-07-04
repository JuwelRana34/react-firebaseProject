// src/components/Admin.js
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';
import Notice from '../components/Notice';

function Admin() {
  const [user, loading, error ] = useAuthState(auth);
  const [adminData, setAdminData] = useState(null);
  const [users, setUsers] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

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
  if (!isAdmin) return <div>Access Denied</div>;

  return (
    <div>
      <h1>Admin Dashboard Welcome {adminData.name} </h1>
      {users.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
        <Notice/>
    </div>
  );
}

export default Admin;

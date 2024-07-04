import { useEffect, useState  } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDocs ,collection } from "firebase/firestore";

const AdminCheck= () => {

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // setUserId(user.uid);
        setUser(user.uid);
       
        const fetchData = async () => {
          try {
              const querySnapshot = await getDocs(collection(db, "users"));
           
             console.log(querySnapshot); 
              
          } catch (error) {
              console.error("Error fetching user data: ", error);
          }
      };

      fetchData();

        
        // Fetch user role from Firestore
       
    }});

    // Clean up subscription on unmount
    return () => unsubscribe();
    
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>User ID: {user}</p>
          <p>{role ? "User is an Admin" : "User is not an Admin"}</p>
        </div>
      ) : (
        <p>No user signed in</p>
      )}
    </div>
  );
};

export default AdminCheck;
import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig"; // Import your Firestore and Auth config
import { onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth

const BirthdayWish = () => {
  const [birthdayUsers, setBirthdayUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    // Check the current logged-in user
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch the current user's data from Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setCurrentUser({ id: user.uid, ...userDoc.data() });
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users"); // Replace with your collection name
      const userSnapshot = await getDocs(usersCollection);
      const usersList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    

      const today = new Date();
      const todayString = `${today.getMonth() + 1}-${today.getDate()}`;
 
      const birthdayList = usersList.filter(user => {
        const userDate = new Date(user.dob * 1000); // Firestore stores dates as timestamps
        const userBirthdayString = `${userDate.getMonth() + 1}-${userDate.getDate()}`;
        return todayString === userBirthdayString;
      }); 
      console.log(birthdayList)

      setBirthdayUsers(birthdayList);
    };

    fetchUsers();
  }, []);

  const Buser =  birthdayUsers.length
  
  if (birthdayUsers.length === 0) {
    return null; // Hide the component when there are no birthdays
  }

  return (
    <>
    {/* <div className=" text-white bg-gradient-to-l from-[#c471f5] to-[#fa71cd] py-3 text-sm px-4 text-center"> */}
    <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 text-white  py-3  px-4 text-center">
      {birthdayUsers.length > 0 && (
        <div className="birthday-wish">
          {birthdayUsers.map((user, index) => (
            <div key={index}>
              {currentUser && currentUser.id === user.id ? (
                <h2> 🎉 Happy Birthday, {user.name}! 🎂</h2>
              ) : (
                <h2> 🎉 It's {user.name}'s birthday 🎂 today! Wish  them well! <i className="text-black">👨‍🎓 Batch:{user.batch}</i></h2>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default BirthdayWish;

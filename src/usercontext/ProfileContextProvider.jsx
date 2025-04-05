// src/context/ProfileContextProvider.js
import  { useState, useEffect } from "react";
import ProfileContext from "./ProfileContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Assuming Firebase Auth is set up in firebase.js
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
const ProfileContextProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loadingProfileData, setLoadingProfileData] = useState(true);
    useEffect(() => {
        const fetchUserData = async (uid) => {
          const userDoc = doc(db, "users", uid);
          const userSnapshot = await getDoc(userDoc);
          if (userSnapshot.exists()) {
            setUserData(userSnapshot.data());
          } else {
            console.log("No such document!");
          }
          setLoadingProfileData(false);
        };
    
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            fetchUserData(user.uid);
          } else {
            setLoadingProfileData(false);
          }
        });
    
        return () => unsubscribe();
      }, []);

    // for user id 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
                // Assuming you have a way to determine if the user is an admin
                // setIsAdmin(user.email === "rk370613@gmail.com"); // Replace with your admin logic
            } else {
                setUserId(null);
                // setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <ProfileContext.Provider value={{ loadingProfileData,userId, setUserId,userData }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileContextProvider;

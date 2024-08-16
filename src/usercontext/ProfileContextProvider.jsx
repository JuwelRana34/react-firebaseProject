// src/context/ProfileContextProvider.js
import  { useState, useEffect } from "react";
import ProfileContext from "./ProfileContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Assuming Firebase Auth is set up in firebase.js

const ProfileContextProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    // const [isAdmin, setIsAdmin] = useState(false);

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
        <ProfileContext.Provider value={{ userId, setUserId, }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileContextProvider;

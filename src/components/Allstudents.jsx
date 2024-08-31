import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useEffect, useState } from 'react';
import { Card } from "flowbite-react";
import profile from "../assets/images/profile.png";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Allstudents() {
    const [currentUser, setCurrentUser] = useState(null);
    const [users, setUsers] = useState([]);

    // Fetch all users 
    useEffect(() => {
        const fetchUsers = async () => {
            const usersSnapshot = await getDocs(collection(db, 'users'));
            setUsers(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchUsers();
    }, []);

    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const fetchUserDetails = async () => {
                    const userRef = collection(db, 'users');
                    const userDoc = await getDocs(userRef);
                    const userData = userDoc.docs.find(doc => doc.id === user.uid);
                    if (userData) {
                        setCurrentUser({ id: user.uid, ...userData.data() });
                    }
                };

                fetchUserDetails();
            } else {
                setCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const canViewPhone = (userGender) => {
        return currentUser && currentUser.gender === userGender;
    };

    // Handling cases where users data is not yet available
    if (!users || users.length === 0) {
        return <div>Loading...</div>; // Add loading state if needed
    }

    return (
        <>
         <div className='grid md:grid-cols-3'>
            {users.map(user => (
                <Card key={user.id} className="w-[95%] md:max-w-sm mx-auto border-none shadow-lg my-4 shadow-[#0094e975] bg-gradient-to-br from-[#80D0C7] to-[#0093E9]">
                    <div className="flex flex-col items-center pb-10">
                        <img
                            src={user.profilePhotoURL || profile}
                            alt="Profile"
                            className="mb-3 rounded-full shadow-lg ring-2 ring-white h-32 w-32 md:h-40 md:w-40"
                        />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
                        <span className="text-sm text-indigo-700 dark:text-white">{user.email}</span>
                        <div className="mt-4 mx-auto text-center space-x-3 lg:mt-6">
                            <a
                                href={user.fbLink}
                                className="inline-flex items-center rounded-lg bg-indigo-600 my-3 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                            >
                                Facebook
                            </a>

                            <table className="border-collapse border border-gray-700">
                                <tbody>
                                    <tr>
                                        <td className="border border-black">Phone:</td>
                                        <td className="border border-black px-2">{canViewPhone(user.gender) ? user.phone : '****'}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black">Batch:</td>
                                        <td className="border border-black px-2 text-fuchsia-900 font-medium">{user.batch}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black">Home District:</td>
                                        <td className="border border-black px-2 uppercase">{user.selectedLocation}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
        </>
    );
}

export default Allstudents;

// src/UserDashboard.js
import profile from "../assets/images/profile.png";
import { useState, useEffect, useContext } from "react";
import { db} from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { Card, Dropdown } from "flowbite-react";
import ProfileContext from "../usercontext/ProfileContext.js";
import { Link, NavLink } from "react-router-dom";
import DisplayUsers from "../components/DisplayUsers.jsx";
import SearchUser from "../components/SearchUser.jsx";


function UserDashboard() {
  const { userId, userData, loadingProfileData} = useContext(ProfileContext);
  const [profilePhotoURL, setProfilePhotoURL] = useState("");

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

  if (loadingProfileData) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }
  const { name, email, role, batch, phone, fbLink, selectedLocation } =
    userData;

  return (
    <div>
      <h1 className=" text-xl md:text-2xl w-5/6 mb-4 mx-auto text-center rounded-md py-3 text-white bg-green-400 shadow-lg  shadow-green-300 ">
        Welcome to your Dashbord{" "}
        <span className=" font-semibold text-[#07273b]"> {name}</span> !
      </h1>

      {userData?.isNewGoogleUser === true && (
        <div className=" px-2 md:text-center">
          <div className=" md:flex gap-3 bg-yellow-100 border-yellow-100 text-yellow-500 w-fit mx-auto p-5 rounded-md shadow-lg  shadow-orange-200">
            <img
              className="w-10 h-10"
              src="https://cdn-icons-png.flaticon.com/128/6742/6742749.png"
              alt="warning"
            />

            <p>
              <h1 className=" text-start font-medium">Hi {name},</h1>
              Reminder : Your profile is incomplete. Please update it to access
              all features.
              <Link
                to="/profile-setup"
                className="text-blue-500 underline mx-1"
              >
                Update Profile
              </Link>
            </p>
          </div>
        </div>
      )}
      <Card className=" w-[95%] md:max-w-sm mx-auto shadow-lg  my-4 shadow-indigo-300 bg-gradient-to-bl from-indigo-400">
        <div className="flex text-white justify-end px-4 pt-4 ">
          <Dropdown inline label="">
            <Dropdown.Item>
              <NavLink
                to="/PhotoUpdate"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                update Photo
              </NavLink>
            </Dropdown.Item>
          </Dropdown>
        </div>
        {/* image of profile  */}
        <div className="flex flex-col items-center pb-10">
          <img
            src={profilePhotoURL || profile}
            alt="Profile"
            className="mb-3 rounded-full shadow-lg ring-2 ring-white h-32 w-32 md:h-40 md:w-40 "
          />

          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {name}
          </h5>
          <span className="text-sm text-indigo-700 dark:text-white">
            {email}
          </span>
          <div className="mt-4 mx-auto text-center space-x-3 lg:mt-6">
            <a
              href={fbLink}
              className="inline-flex items-center rounded-lg   bg-indigo-600 my-3 px-4 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              facebook
            </a>

            <table className="border-collapse border border-indigo-700 ...">
              <tbody>
                <tr>
                  <td className="border  border-indigo-400 ...">Phone:</td>
                  <td className="border border-indigo-400 px-2 ...">{phone}</td>
                </tr>
                <tr>
                  <td className="border  border-indigo-400 ...">Batch:</td>
                  <td className="border border-indigo-400 px-2 text-red-700 font-medium ...">
                    {batch}
                  </td>
                </tr>
                <tr>
                  <td className="border  border-indigo-400 ...">status:</td>
                  <td className="border border-indigo-400 px-2 uppercase ...">
                    {role}
                  </td>
                </tr>
                <tr>
                  <td className="border  border-indigo-400 ...">HomeDistic:</td>
                  <td className="border border-indigo-400 px-2 uppercase ...">
                    {selectedLocation}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      <DisplayUsers />
      <hr className="mx-5" />
      <SearchUser />
    </div>
  );
}

export default UserDashboard;

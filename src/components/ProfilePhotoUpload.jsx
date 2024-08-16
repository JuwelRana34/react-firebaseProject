// src/components/ProfilePhotoUpload.js
import  { useState, useEffect,useContext} from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../firebaseConfig";
import ProfileContext from "../usercontext/ProfileContext.js"

const ProfilePhotoUpload = () => {
  const { userId } = useContext(ProfileContext);


  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profilePhotoURL, setProfilePhotoURL] = useState("");

  // useEffect(() => {
  //   // Fetch existing profile photo URL if available
  //   const fetchProfilePhoto = async () => {
  //     const docRef = doc(db, "users", userId);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setProfilePhotoURL(docSnap.data().profilePhotoURL);
  //     }
  //   };

  //   fetchProfilePhoto();
  // }, [userId]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `profilePhotos/${userId}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          setProfilePhotoURL(url);

          // Save the profile photo URL to Firestore
          await setDoc(doc(db, "users", userId), { profilePhotoURL: url }, { merge: true });
        });
      }
    );
  };

  return (
    <div className="p-2">
      <input type="file" className=" border-[1px] w-[95%] mx-auto md:w-[50%] " onChange={handleFileChange} />
      <button onClick={handleUpload} className="bg-green-radial m-2 text-white px-4 py-3 rounded-md">Upload</button>
      <p className=" bg-fuchsia-900 text-white p-2 w-[90%] md:w-[35%]">Upload Progress: {uploadProgress}%</p>
{/* 
      {profilePhotoURL && (
        <div>
          <h3>Your Profile Photo:</h3>
          <img src={profilePhotoURL} alt="Profile" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
        </div>
      )} */}

    </div>
  );
};

export default ProfilePhotoUpload;

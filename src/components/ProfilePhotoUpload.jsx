// src/components/ProfilePhotoUpload.js
import  { useState, useContext} from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../firebaseConfig";
import ProfileContext from "../usercontext/ProfileContext.js"
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { Alert , FileInput, Label, Progress } from "flowbite-react";




const ProfilePhotoUpload = () => {
  const { userId } = useContext(ProfileContext);
  const navigate = useNavigate();


  const [showPopup , setShowPopup] = useState(false)
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [profilePhotoURL, setProfilePhotoURL] = useState("");
  const [error, setError] = useState("");
  const MAX_FILE_SIZE = 1 * 1024 * 1024;


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
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.size > MAX_FILE_SIZE) {
      setError("File size exceeds 1 MB. Please select a smaller file.");
      setFile(null); // Clear the file input
    } else {
      setError("");
      setFile(selectedFile);
    }

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
          setShowPopup(true)
        });
      }
    );
  };

  // const closePopup = () => {
  //   setShowPopup(false);
  // };

  const anotherpage = () => {
    return navigate("/user"); // Change "/profile" to the path you want to navigate to
  }

  return (
    <div className="p-2">
      {/* <input type="file" className="  border-[1px] w-[95%] mx-auto md:w-[50%] " onChange={handleFileChange} /> */}
      <div>
      <div>
        <Label htmlFor="file-upload-helper-text" value="Upload Profile Photo" />
      </div>
      <FileInput id="file-upload-helper-text" onChange={handleFileChange} helperText="PNG, JPG or GIF recommend(JPG) (MAX. 400x400px)." />
    </div>


      {error && <Alert color="failure" icon={HiInformationCircle}>
      <span className="font-medium">error alert!</span> {error}
    </Alert>}

      <button onClick={handleUpload} className="bg-green-radial m-2 text-white px-4 py-3 rounded-md">Upload</button>

      {/* <p className=" bg-fuchsia-900 text-white p-2 w-[90%] md:w-[35%]">Upload Progress: {uploadProgress}%</p> */}
      {uploadProgress > 0 && <Progress  progress={uploadProgress} textLabel="Uploading..." size="lg"  labelProgress labelText /> 
      
     }
      
      {showPopup && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-5 w-[80%] md:w-[40%]  rounded-lg">
          <FaCheckCircle className="h-10 w-10 text-green-400"/>
            <p className=" py-5">Profile photo uploaded successfully!</p>
            <button onClick={anotherpage} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Close</button>
          </div>
        </div>

      )}

    </div>
  );
};

export default ProfilePhotoUpload;

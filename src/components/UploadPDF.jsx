import  { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { storage, db } from '../firebaseConfig'; // import storage and db from firebase config
import {  toast } from 'react-toastify';
import { FileInput, Label ,Button, Progress } from "flowbite-react";



function UploadPDF() {
  const [pdfFile, setPdfFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const MAX_SIZE_MB = 20;


  
  const notify = () => toast.success('** File upload succesfully', {
    theme: "colored",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.size / 1024 / 1024 > MAX_SIZE_MB) {
        toast.error(`File size exceeds ${MAX_SIZE_MB} MB`);
        setPdfFile(null);
      } else {
        setPdfFile(file);
        
      }
    
  };

  const handleUpload = async () => {
    if (!pdfFile) return;

    const storageRef = ref(storage, `pdfs/${pdfFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, pdfFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload failed", error);
        toast.error(`${error}`)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          saveFileMetadata(pdfFile.name, downloadURL);
          setPdfFile(null);
          setProgress(0);
          notify()
        });
      }
    );
  };

  const saveFileMetadata = async (fileName, downloadURL) => {
    try {
      await addDoc(collection(db, "pdfs"), {
        name: fileName,
        url: downloadURL,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("Error saving file metadata", error);
      toast.error(`${error}`)
    }
  };

  return (
    <div className='m-2 '>

      <div className='mx-auto'>
      <div >
        <Label htmlFor="file-upload-helper-text" value="Upload file" />
      </div>
      <FileInput className=' md:w-[50%] my-2' type="file" accept="application/pdf" onChange={handleFileChange} id="file-upload-helper-text" helperText="Pdf (MAX. 20 MB)." />
    </div>

      <Button  onClick={handleUpload}gradientDuoTone="greenToBlue">Profile</Button>
      {progress > 0 && <Progress
      progress={progress}
      progressLabelPosition="inside"
      textLabel="uploading..."
      textLabelPosition="outside"
      size="lg"
      labelProgress
      labelText
    /> }
    </div>
  );
}

export default UploadPDF;

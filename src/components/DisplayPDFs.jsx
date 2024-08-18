import  { useEffect, useState } from 'react';
import { collection, getDocs, deleteDoc, doc  } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db , storage} from '../firebaseConfig';
import useAdminCheck from "../hooks/useAdminCheck.js"
import pdflogo from "../assets/images/pdfIcon.png"

function DisplayPDFs() {
  const [pdfs, setPdfs] = useState([]);
  const {isAdmin} = useAdminCheck();
console.log(pdfs)
  useEffect(() => {
    const fetchPdfs = async () => {
      const pdfCollection = collection(db, "pdfs");
      const pdfSnapshot = await getDocs(pdfCollection);
      const pdfList = pdfSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPdfs(pdfList);
    };

    fetchPdfs();
  }, []);

  const handleDelete = async (pdfId, fileName) => {
    try {
      // Delete the file from Firebase Storage
      const fileRef = ref(storage, `pdfs/${fileName}`);
      await deleteObject(fileRef);

      // Delete the document from Firestore
      const pdfDocRef = doc(db, "pdfs", pdfId);
      await deleteDoc(pdfDocRef);

      // Remove the deleted PDF from the state
      setPdfs(pdfs.filter(pdf => pdf.id !== pdfId));
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };


  return (
    <div>
      <h2 className='w-[80%] p-3 mb-5 bg-gradient-to-r from-blue-400 to-cyan-600 text-white text-xl font-semibold shadow-lg rounded-md mx-auto text-center '>Previous years Qustions PDFs</h2>

      


  <div  className="container w-full md:w-[60%] mx-auto">
    <div className="m-2 md:m-4 md:mt-10 md:ml-10">
      {pdfs.map((pdf) => (
            
        <li key={pdf.id} className="flex items-center mx-auto font-semibold  w-auto bg-gray-200 rounded-lg mb-2 p-2"
        target="_blank" rel="noopener noreferrer"  >
         <img
          src={pdflogo}
          alt=""
          className="mr-2 h-10 w-10"
        />
        {pdf.name}

          <div className='md:flex'>
             <button className=' py-2 w-24 text-center  m-2 text-white rounded-md bg-green-400 hover:bg-green-500 ' onClick={() => window.open(pdf.url)}>Download</button>

        {isAdmin && ( 
            <button  className=' py-2 w-24 text-center m-2 text-white rounded-md bg-red-400 hover:bg-red-700' onClick={() => handleDelete(pdf.id, pdf.name)}>Delete</button> 
          )}

          </div>
       
      </li> ))}
      
        </div>
        </div>
    



    </div>
  );
}

export default DisplayPDFs;

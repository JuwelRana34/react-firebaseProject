import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the path accordingly
import { Player } from '@lottiefiles/react-lottie-player';
import useAdminCheck from '../hooks/useAdminCheck';
import pdflogo from '../assets/images/pdfIcon.png';
import { toast } from "react-toastify";

const PDFList = () => {
  const [pdfLinks, setPdfLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAdminCheck();

  useEffect(() => {
    // Function to fetch PDF links from Firestore, ordered by creation date
    const fetchPDFLinks = async () => {
      const q = query(collection(db, "pdfs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const links = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setPdfLinks(links);
      setLoading(false)
      
    };

    fetchPDFLinks();
  }, []);

  // Function to delete a PDF link from Firestore
  const handleDelete = async (id) => {
    try {
      // Delete the document with the specified ID from the Firestore collection
      await deleteDoc(doc(db, "pdfs", id));
      // Update the state to remove the deleted link from the list
      setPdfLinks((prevLinks) => prevLinks.filter((pdf) => pdf.id !== id));
      toast.success("pdf file delete successfully!")
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error(error)
    }
  };

  return (
    <>
    
    <div className="mt-4">
      <h2 className='w-[80%] p-3 mb-5 bg-gradient-to-r from-blue-400 to-cyan-600 text-white text-xl font-semibold shadow-lg rounded-md mx-auto text-center'>
        Previous Years Questions PDFs
      </h2>

      <Player
          autoplay
          loop
          src="https://lottie.host/fefe81d5-dea1-4c0b-b92c-4abf9ab8b921/CD71cyLtrb.json"
          className='w-[50%] md:w-[20%] rounded-lg '
        />

      {loading ? (
        <p className="text-center">Loading PDFs...</p>
      ) : (
        <div className='container mt-10 w-full md:w-[90%] mx-auto'>
          <div className='m-2 md:m-4 justify-center grid md:grid-cols-2 md:gap-5 '>
            {pdfLinks.map((pdf, index) => (
         
              
              
              <li
                key={pdf.id} 
                className={`flex w-full items-center mx-auto font-semibold  ${index % 2 === 0 ? 'bg-blue-300 ' : 'bg-teal-300'}   rounded-lg mb-2 p-2`}>
                {/* className='flex items-center mx-auto font-semibold w-auto  rounded-lg mb-2 p-2'> */}
                <img src={pdflogo} alt="" className='mr-2 h-10 w-10' />
                {pdf.name}

                <div className='lg:flex  right-0 '>

                <a href={pdf.link} download={pdf.name}>
                    <button
                        className='py-2 w-24 text-center m-2 text-white rounded-md bg-green-400 hover:bg-green-500'>
                        Download
                    </button>
                </a>

                  {isAdmin && (
                    <button
                      className='py-2 w-24 text-center m-2 text-white rounded-md bg-red-500 hover:bg-red-700'
                      onClick={() => handleDelete(pdf.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </li>


            ))}


          </div>
        </div>
      )}
    </div>
    
    
    </>
  );
};

export default PDFList;

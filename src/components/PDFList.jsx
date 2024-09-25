import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the path accordingly
import { Player } from "@lottiefiles/react-lottie-player";
import useAdminCheck from "../hooks/useAdminCheck";
import pdflogo from "../assets/images/pdfIcon.png";
import { Alert } from "flowbite-react";
import { toast } from "react-toastify";

const PDFList = () => {
  const [pdfLinks, setPdfLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAdminCheck();
  const [selectedYear, setSelectedYear] = useState("1st Year"); // State to store selected year

  const years = ["1st Year", "2nd Year", "3rd Year", "4th Year"]; // Array of years

  useEffect(() => {
    // Function to fetch PDF links from Firestore, ordered by creation date
    const fetchPDFLinks = async () => {
      const q = query(collection(db, "pdfs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const links = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPdfLinks(links);
      setLoading(false);
    };

    fetchPDFLinks();
  }, []);

  // Function to delete a PDF link from Firestore
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "pdfs", id));
      setPdfLinks((prevLinks) => prevLinks.filter((pdf) => pdf.id !== id));
      toast.success("PDF file deleted successfully!");
    } catch (error) {
      console.error("Error deleting document: ", error);
      toast.error(error);
    }
  };

  // Filter PDFs based on the selected year
  const filteredPDFs = pdfLinks.filter((pdf) => pdf.year === selectedYear);

  return (
    <>
      <div className="mt-4">
        <h2 className="w-[80%] p-3 mb-5 bg-gradient-to-r from-blue-400 to-cyan-600 text-white text-xl font-semibold shadow-lg rounded-md mx-auto text-center">
          Previous Years' Questions PDFs
        </h2>

        <Player
          autoplay
          loop
          src="https://lottie.host/fefe81d5-dea1-4c0b-b92c-4abf9ab8b921/CD71cyLtrb.json"
          className="w-[50%] md:w-[20%] rounded-lg "
        />

{/* Year selection buttons */}
<div className="flex justify-center mt-5 p-2 space-x-4 mb-4">
          {years.map((year) => (
            <div
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`cursor-pointer p-4 rounded-lg border ${
                selectedYear === year
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
            >
              {year}
            </div>
          ))}
        </div>

        <p className="text-gray-500 w-4/6 mx-auto text-center"><span className="text-rose-600">Note:</span> you need IHC full syllabus 1st to 4th year than you click on the top the button 1st Year </p>


        {loading ? (
          <p className="text-center">Loading PDFs...</p>
        ) : filteredPDFs.length === 0 ? (
         <Alert className="mt-5 m-2 " color="warning" rounded>
      <span className="font-medium">Info alert!</span> 
    No PDFs available for {selectedYear}</Alert>
        ) : (
          <div className="container mt-10 w-full md:w-[90%] mx-auto">
            <div className="m-2 md:m-4 justify-center grid md:grid-cols-2 md:gap-5 ">
              {filteredPDFs.map((pdf, index) => (
                <div
                  key={pdf.id}
                  className={`border ${
                    index % 2 === 0
                      ? "bg-gradient-to-r to-blue-300 from-white border-blue-200"
                      : "bg-gradient-to-l to-teal-300 from-white border-teal-200 "
                  } mb-2 p-2 rounded-lg flex items-center justify-between`}
                >
                  <li className={`flex w-full items-center mx-auto font-semibold`}>
                    <img src={pdflogo} alt="" className="mr-2 h-10 w-10" />
                    {pdf.name}
                  </li>

                  <div className="lg:flex right-0 ">
                    <a href={pdf.link} download={pdf.name}>
                      <button
                        className={`${
                          index % 2 === 0 ? "bg-blue-400" : "bg-teal-400"
                        } py-2 w-24 text-center m-2 text-white rounded-md hover:bg-green-500`}
                      >
                        Download
                      </button>
                    </a>

                    {isAdmin && (
                      <button
                        className="py-2 w-24 text-center m-2 text-white rounded-md bg-red-500 hover:bg-red-700"
                        onClick={() => handleDelete(pdf.id)}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PDFList;

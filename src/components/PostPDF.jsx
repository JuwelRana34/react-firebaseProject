import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Adjust the path accordingly
import { toast } from "react-toastify";

const PostPDF = () => {
  const [pdfLink, setPdfLink] = useState("");
  const [fileName, setFileName] = useState("");
  const [year, setYear] = useState(""); // State to store selected year

  // Array of predefined years
  const years = ["1st Year", "2nd Year", "3rd Year","4th Year"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pdfLink && fileName && year) {
      try {
        await addDoc(collection(db, "pdfs"), {
          name: fileName,
          link: pdfLink,
          year: year, // Store the selected year
          createdAt: new Date(),
        });
        setPdfLink("");
        setFileName("");
        setYear(""); // Reset year after upload
        toast.success("PDF Uploaded Successfully!");
      } catch (error) {
        toast.error("Error Uploading PDF: ", error);
      }
    } else {
      toast.error("Please fill in all fields.");
    }
  };

  return (
    <>
      <h1 className='w-[80%] md:w-[60%] p-3 my-5 bg-gradient-to-r from-blue-400 to-cyan-600 text-white text-xl font-semibold shadow-lg rounded-md mx-auto text-center'>
        Upload PDF
      </h1>

      <form onSubmit={handleSubmit} className="w-5/6 mx-auto text-center space-y-4 my-5">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="Enter File Name"
          required
          className="mx-2"
        />
        <input
          type="text"
          value={pdfLink}
          onChange={(e) => setPdfLink(e.target.value)}
          placeholder="Enter Google Drive PDF Link"
          required
        />
        
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          className="mx-2"
        >
          <option value="" disabled>Select Year</option> {/* Default option */}
          {years.map((yr, index) => (
            <option key={index} value={yr}>
              {yr}
            </option>
          ))}
        </select>

        <button type="submit" className="btn-grad inline-block">
          Upload PDF
        </button>
      </form>
    </>
  );
};

export default PostPDF;

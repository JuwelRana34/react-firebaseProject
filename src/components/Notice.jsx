import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import useAdminCheck from "../hooks/useAdminCheck";
import { toast } from "react-toastify";
import { Player } from "@lottiefiles/react-lottie-player";

function Notice() {
  const [Notice, setNotice] = useState([]);
  const { isAdmin } = useAdminCheck();
  const examDate = [
    {
      date: "27/04/2025",
      subject: "IHC-2201",
      time: "9:00 AM ",
    },
    {
      date: "28/04/2025",
      subject: "IHC-2202",
      time: "10:00 AM ",
    },
    {
      date: "29/04/2025",
      subject: "IHC-2203",
      time: "12:00 AM ",
    },
    {
      date: "30/04/2025",
      subject: "IHC-2204",
      time: "11:00 AM ",
    },
  ];
  const examEndDate = "04/30/2025 11:00 AM";

  const notify = () =>
    toast.error("** notice deleted **", {
      theme: "colored",
    });

  useEffect(() => {
    const fetchUNotice = async () => {
      const usersSnapshot = await getDocs(collection(db, "notices"));
      setNotice(
        usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchUNotice();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleString(); // Adjust formatting as needed
  };

  const handleDelete = async (id) => {
    if (isAdmin) {
      await deleteDoc(doc(db, "notices", id));
      setNotice(Notice.filter((notice) => notice.id !== id));
      notify();
    } else {
      alert("You don't have permission to delete this notice.");
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-orange-500 text-xl my-1 md:text-2xl ">
        {" "}
        Notice of Department IHC{" "}
      </h1>
      <hr className="  w-5/6 h-[1px] mx-auto" />

      <Player
        autoplay
        loop
        src="https://lottie.host/f07f6bb7-ff6e-4cd2-8b0c-2797aa803517/xgyMhzFvv3.json"
        className=" w-[50%] mx-auto md:w-[25%]"
      />

      {/* exam routine  */}
      <div className={`overflow-x-auto container mx-auto mt-10 ${new Date(examEndDate) < new Date() ? "hidden" : ""}`}>
        <table className="table-auto border-collapse border border-gray-300 w-full text-center">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Data</th>
              <th className="border border-gray-300 px-4 py-2">Course</th>
            </tr>
          </thead>
          <tbody>
            {examDate.map((exam, index) => {
              // Split the date into parts
              const [day, month, year] = exam.date.split("/");

              // Combine date and time into a single valid Date string
              const fullDateTimeString = `${month}/${day}/${year} ${exam.time}`; // now MM/DD/YYYY

              // Create full Date object
              const examDateTime = new Date(fullDateTimeString);

              // Current time
              const now = new Date();

              return (
                <tr
                  key={index}
                  className={` ${
                    examDateTime < now ? "bg-rose-200 text-rose-600 cursor-not-allowed" : "hover:bg-gray-100"
                  }`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {exam.date}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {exam.subject}{" "}
                    <span  className={` ${
                    examDateTime < now ? "text-red-600" : "hover:bg-gray-100 text-green-500"
                  }`}>( {exam.time} )</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* exam routine  */}

      {Notice.map((notics) => (
        <div key={notics.id} className="  h-auto w-full mx-auto py-3">
          <div className=" justify-center w-full h-auto items-center mx-auto ">
            <div className="border-[#337ab7] bg-[#d9edf7]  overflow-hidden border-[1px] rounded-md w-[95%] md:w-5/6  m-5   mx-auto ">
              <h1 className="bg-[#337ab7]  mb-4 rounded-t-md shadow-md text-white text-md md:text-2xl p-2  font-bold font-serif">
                <i className="fa-solid px-2 md:px-3 fa-circle-info inline-block"></i>
                {notics.title}
              </h1>

              <p className="text-justify  text-[#2379c4] mb-2  p-2">
                {notics.text}
              </p>
              <p className="m-2">
                Posted on:{" "}
                {formatDate(new Date(notics.createdAt.seconds * 1000))}
              </p>

              {isAdmin && (
                <div className="flex justify-end m-2">
                  <button
                    onClick={() => handleDelete(notics.id)}
                    className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notice;

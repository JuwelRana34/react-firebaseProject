import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import useAdminCheck from "../hooks/useAdminCheck";
import { toast } from "react-toastify";
import { Player } from "@lottiefiles/react-lottie-player";

function Notice() {
  const [Notice, setNotice] = useState([]);
  const { isAdmin } = useAdminCheck();

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
      <div className="overflow-x-auto container mx-auto mt-10">
        <table className="table-auto border-collapse border border-gray-300 w-full text-center">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Data</th>
              <th className="border border-gray-300 px-4 py-2">Course</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">5/12/2024</td>
              <td className="border border-gray-300 px-4 py-2">IHC-2101 <span className="text-green-500">( 10:00AM )</span></td>
            </tr>
           
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">9/12/2024</td>
              <td className="border border-gray-300 px-4 py-2">IHC-2102 <span className="text-green-500">( 12:00PM )</span></td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">10/12/2024</td>
              <td className="border border-gray-300 px-4 py-2">IHC-2103 <span className="text-green-500">( 11:00AM )</span></td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">11/12/2024</td>
              <td className="border border-gray-300 px-4 py-2">IHC-2104 <span className="text-green-500">( 09:00AM )</span></td>
            </tr>
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

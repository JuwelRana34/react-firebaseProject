import { useEffect, useState } from 'react';
import { getDocs, collection,deleteDoc, doc } from 'firebase/firestore';
import { db} from '../firebaseConfig';
import useAdminCheck from '../hooks/useAdminCheck';
import {  toast } from 'react-toastify';

function Notice() {
    const [Notice, setNotice] = useState([]);
    const {isAdmin} = useAdminCheck();
  
    const notify = () => toast.error('** Logged out succesfully', {
      theme: "colored",
    });

    useEffect(() => {
      const fetchUNotice = async () => {
        const usersSnapshot = await getDocs(collection(db, 'notices'));
        setNotice(usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      };
  
      fetchUNotice();
    }, []);
  
    const formatDate = (date) => {
      return date.toLocaleString(); // Adjust formatting as needed
    };



    const handleDelete = async (id) => {
      if (isAdmin) {
        await deleteDoc(doc(db, 'notices', id));
        setNotice(Notice.filter(notice => notice.id !== id));
        notify()
      } else {
        alert("You don't have permission to delete this notice.");
      }
    };
  
    

  return (
    <>

          <h1 className="text-center font-bold font-mono text-2xl text-black"> জগন্নথ বিশ্ববিদ্যালয়ের আইটি সোসাইটির সকল নোটিস    </h1>
          <hr className="bg-slate-200 mx-4 w-6/6 h-[1px]"/>
          
            {Notice.map(notics => (
          <div key={notics.id} className="  h-auto w-full mx-auto py-3">




    <div className=" justify-center w-full h-auto items-center mx-auto " > 
    <div  className="border-[#337ab7] bg-[#d9edf7]  overflow-hidden border-[1px] rounded-md w-[95%] md:w-5/6  m-5   mx-auto ">
    
        <h1 className="bg-[#337ab7]  mb-4 rounded-t-md shadow-md text-white text-md md:text-2xl p-2  font-bold font-serif"><i  className="fa-solid px-2 md:px-3 fa-circle-info inline-block"></i>{notics.title}</h1>

      <p className="text-justify  text-[#2379c4] mb-2  p-2">{notics.text}</p>
      <p className='m-2'>Posted on: {formatDate(new Date(notics.createdAt.seconds * 1000))}</p>

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
          
      </div> ))}


          

    </>
    
  )
}

export default Notice
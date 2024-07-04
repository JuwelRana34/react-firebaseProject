import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db} from '../firebaseConfig';
// import NoticeForm from './NoticeForm';


function Notice() {
    const [Notice, setNotice] = useState([]);

 
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

  return (
    <>
    <div>Notice</div>
    <ul>
        {Notice.map(notics => (
          <div key={notics.id}>
            <p>{notics.text}</p>
            <p>Posted on: {formatDate(new Date(notics.createdAt.seconds * 1000))}</p>
          </div>
          
        ))}
      </ul>
    </>
    
  )
}

export default Notice
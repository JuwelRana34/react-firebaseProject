
import { getAuth, deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Firestore reference

function DeleteAccountButton({ userId }) {
  const auth = getAuth();

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      alert("No user is signed in.");
      return;
    }

    try {
      // 1. Delete user data from Firestore
      await deleteDoc(doc(db, "users", userId));

      // 2. Delete user from Firebase Authentication
      await deleteUser(user);

      alert("Account deleted successfully.");

    } catch (error) {
      console.error("Error deleting account:", error);
      alert(`Error deleting account: ${error.message}`);
    }
  };

  return (
    <button onClick={handleDeleteAccount}>
      Delete Account
    </button>
  );
}

export default DeleteAccountButton;

// src/components/Admin.js
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Accordion, Table, Modal, Button } from "flowbite-react";
import NoticeForm from "../page/NoticeForm";
import profile from "../assets/images/profile.png";
import PostVideo from "../components/PostVideo";
import PostDriveLink from "../components/PostDriveLink";
import PostPDF from "../components/PostPDF";

function Admin() {
  const [user, loading, error] = useAuthState(auth);
  const [adminData, setAdminData] = useState(null);
  const [users, setUsers] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility
  const [userToDelete, setUserToDelete] = useState(null); // User to be deleted

  // Open modal and set user to delete
  const openModal = (userId) => {
    setUserToDelete(userId);
    setShowModal(true);
  };

  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setUserToDelete(null); // Clear user to delete
  };

  // Handle user deletion with confirmation popup
  const handleDelete = async () => {
    if (!userToDelete) return;

    try {
      // Delete the user document from Firestore
      await deleteDoc(doc(db, "users", userToDelete));

      // Optionally, refresh the user list
      setUsers(users.filter((user) => user.id !== userToDelete));
      alert("User deleted successfully.");
      closeModal(); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  // Fetch admin data
  useEffect(() => {
    const fetchUserData = async (uid) => {
      const userDoc = doc(db, "users", uid);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        setAdminData(userSnapshot.data());
      } else {
        console.log("No such document!");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      setUsers(usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, []);

  // Admin checker
  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };
    checkAdmin();
  }, [user]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!isAdmin) return <div>Access Denied. You are not an admin 😈</div>;

  return (
    <div>
      <h1 className=" text-xl md:text-2xl w-5/6 mb-4 mx-auto text-center rounded-md py-3 text-white bg-green-400 shadow-lg  shadow-green-300 ">
        Welcome to Admin Dashboard{" "}
        <span className=" font-semibold text-[#07273b]"> {adminData?.name}</span>!
      </h1>

      <NoticeForm />
      <PostPDF />
      <PostVideo />
      <PostDriveLink />

      {/* Users List */}
      <Accordion collapseAll className="mx-3">
        <Accordion.Panel>
          <Accordion.Title className="text-green-500">
            <p className=" text-fuchsia-800 inline">
              Total users = {users?.length || 0}
            </p>
            You want to see users? Just click on it.
          </Accordion.Title>
          <Accordion.Content>
            <div className="overflow-x-auto my-5">
              <Table striped>
                <Table.Head>
                  <Table.HeadCell>Photo</Table.HeadCell>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Role</Table.HeadCell>
                  <Table.HeadCell>Email</Table.HeadCell>
                  <Table.HeadCell>Batch</Table.HeadCell>
                  <Table.HeadCell>Contact</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {users?.map((user) => (
                    <Table.Row
                      key={user.id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        <img
                          src={user.profilePhotoURL || profile}
                          className="h-10 w-10 md:h-16 md:w-16 rounded-full"
                          alt="Profile"
                        />
                      </Table.Cell>
                      <Table.Cell className="capitalize">{user.name}</Table.Cell>
                      <Table.Cell className="uppercase">{user.role}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>{user.batch}</Table.Cell>
                      <Table.Cell>
                        <button
                          onClick={() => openModal(user.id)}
                          className="font-medium text-white bg-red-400 py-2 px-3 rounded-md hover:bg-red-500"
                        >
                          Delete
                        </button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>

      {/* Modal for Deletion Confirmation */}
      <Modal show={showModal} size="md" popup={true} onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, delete
              </Button>
              <Button color="gray" onClick={closeModal}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Admin;

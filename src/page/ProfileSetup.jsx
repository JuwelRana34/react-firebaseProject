import { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Button, Label, TextInput } from "flowbite-react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';

const locations = [
    "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Jamalpur", "Kishoreganj",
    "Madaripur", "Manikganj", "Munshiganj", "Mymensingh", "Narayanganj",
    "Narsingdi", "Netrokona", "Rajbari", "Shariatpur", "Sherpur", "Tangail",
    "Bogra", "Joypurhat", "Naogaon", "Natore", "Nawabganj", "Pabna",
    "Rajshahi", "Sirajgonj", "Dinajpur", "Gaibandha", "Kurigram",
    "Lalmonirhat", "Nilphamari", "Panchagarh", "Rangpur", "Thakurgaon",
    "Barguna", "Barisal", "Bhola", "Jhalokati", "Patuakhali", "Pirojpur",
    "Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla",
    "Cox's Bazar", "Feni", "Khagrachari", "Lakshmipur", "Noakhali",
    "Rangamati", "Habiganj", "Maulvibazar", "Sunamganj", "Sylhet",
    "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna",
    "Kushtia", "Magura", "Meherpur", "Narail", "Satkhira"
  ];
  
  const Batchs = [ "18th" , "19th","20th"]
  
function ProfileSetup() {
    const [phone, setPhone] = useState('');
    const [batch, setBatch] = useState('');
    const [fbLink, setfbLink] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [gender, setGender] = useState('');
    const [dob, setDob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(userRef);
                if (docSnap.exists() && !docSnap.data()?.isNewGoogleUser) {
                    // User already completed profile or didn't sign in with Google initially
                    navigate('/'); 
                    toast.warning('Your profile  all right. no need to update')
                    // Redirect to main app
                } else if (!docSnap.exists()) {
                    setError("User data not found.");
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            } else {
                navigate('/login'); 
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (auth.currentUser) {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                await updateDoc(userRef, {
                    phone,
                    batch,
                    fbLink,
                    selectedLocation,
                    gender,
                    dob: dob ? new Date(dob) : null,
                    isNewGoogleUser: false, // Mark profile as completed
                });
                toast.success("Profile updated successfully!");
                navigate('/'); // Redirect to main application
            } else {
                toast.error("User not authenticated.");
            }
        } catch (err) {
            console.error("Error updating profile:", err);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading profile setup...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-semibold mb-4">Complete Your Profile</h1>
            <form onSubmit={handleSubmit} className="max-w-md w-full">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="Phone" value="Your number" />
                    </div>
                    <TextInput id="phone" type="number" placeholder="Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>

                <div className="my-4 ">
                    <div className="mb-2 block">
                        <Label htmlFor="dob" value="Date of Birth" />
                    </div>
                    <DatePicker
                        selected={dob}
                        onChange={(date) => setDob(date)}
                        dateFormat="dd/MM/yyyy"
                        className="w-full p-2 border rounded-md"
                        maxDate={new Date()}
                        showYearDropdown
                        scrollableYearDropdown
                        required
                    />
                </div>

                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="facebook link" value="Facebook link" />
                    </div>
                    <TextInput id="facebook link" type="text" placeholder="https://www.facebook.com/xxx" value={fbLink} onChange={(e) => setfbLink(e.target.value)} required />
                </div>

                <div className="my-4 ">
                    <div className="mb-2 block">
                        <Label htmlFor="gender" value="Gender" />
                    </div>
                    <div>
                        <label className="inline-flex items-center">
                            <input type="radio" value="Male" checked={gender === 'Male'} onChange={() => setGender('Male')} className="form-radio" required />
                            <span className="ml-2">Male</span>
                        </label>
                        <label className="inline-flex items-center ml-4">
                            <input type="radio" value="Female" checked={gender === 'Female'} onChange={() => setGender('Female')} className="form-radio" required />
                            <span className="ml-2">Female</span>
                        </label>
                    </div>
                </div>

                <label className='my-4 font-medium block'>
                    Home District:
                    <select
                        className='mx-2 w-full border rounded-md p-2'
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        required
                    >
                        <option value="">Select your Home District</option>
                        {locations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </label>

                <label className='my-4 font-medium block'>
                    Batch:
                    <select
                        className='mx-2 w-full border rounded-md p-2'
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                        required
                    >
                        <option value="" disabled>Select your Batch</option>
                        {Batchs.map((Batch, index) => (
                            <option key={index} value={Batch}>{Batch}</option>
                        ))}
                    </select>
                </label>

                <Button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                    Save Profile
                </Button>
            </form>
        </div>
    );
}

export default ProfileSetup;
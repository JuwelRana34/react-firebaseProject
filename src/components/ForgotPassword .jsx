import  { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify for notifications
import { FloatingLabel } from "flowbite-react";



const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        try {
            await sendPasswordResetEmail(auth, email);
            toast.success('Password reset email sent! Check your inbox.');
            setEmail('')
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='h-screen' >
            <h2 className='w-[80%] p-3 mb-5 bg-gradient-to-r from-blue-400 to-cyan-600 text-white text-xl font-semibold shadow-lg rounded-md mx-auto text-center '>Reset Your Password</h2>
            <form className='  w-[90%] md:w-3/6 mx-auto' onSubmit={handlePasswordReset}>
                {/* <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                /> */}

           
                
                <FloatingLabel className='w-3/4 md:w-3/6 ml-2' type="email" required value={email}
                    onChange={(e) => setEmail(e.target.value)}  variant="outlined" label="Enter your email" />
             
                <button className='py-2 px-4 bg-green-radial text-white rounded-lg mx-2' type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;

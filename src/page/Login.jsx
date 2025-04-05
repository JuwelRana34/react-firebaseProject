// src/components/Login.js
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth,db } from "../firebaseConfig";
import { Button, Label, TextInput } from "flowbite-react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Player } from "@lottiefiles/react-lottie-player";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirectToProfileSetup, setRedirectToProfileSetup] = useState(false);

  const notify = () =>
    toast.success("😀 Login successfully", {
      position: "top-right",
      theme: "colored",
    });

    const registrationSuccessNotify = (displayName) => toast.success(`🎉 Welcome, ${displayName}! You've successfully signed in with Google.`, {
      position: "top-right",
      theme: "colored",
  });

  const notifyEmailVerification = () =>
    toast.warning("Please verify your email before logging in.", {
      position: "top-right",
      theme: "colored",
    });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        setIsLoggedIn(true);
        setEmail("");
        setPassword("");
        notify();
      } else {
        notifyEmailVerification();
        auth.signOut();
      }
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  const handelGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result?.user;

        if (user) {
            const userRef = doc(db, 'users', user?.uid);
            const docSnap = await getDoc(userRef);

            if (!docSnap.exists()) {
                await setDoc(userRef, {
                    uid: user?.uid,
                    email: user?.email,
                    name: user?.displayName || '',
                    isNewGoogleUser: true, // Flag for first-time Google login
                    role: 'user',
                    googleSignIn: true,
                });
                setRedirectToProfileSetup(true); 
                registrationSuccessNotify(user?.displayName);
            } else if (docSnap.data()?.isNewGoogleUser) {
                setRedirectToProfileSetup(true);
                registrationSuccessNotify(user?.displayName);
            } else {
                registrationSuccessNotify(user?.displayName);
                setIsLoggedIn(true); 
            }
        }

    } catch (error) {
        console.error("Error signing in with Google:", error);
        toast.error('Failed to sign in with Google.', {
            position: "top-right",
            theme: "colored",
        });
    }
};

if (redirectToProfileSetup) {
    return <Navigate to="/profile-setup" />;
}

  if (isLoggedIn) {
    return <Navigate to="/user" />;
  }

  return (
    <>
      <Player
        src="https://lottie.host/3030bf88-6f29-48ee-b731-1e18dd360367/sWO6FhFAMD.json"
        loop
        autoplay
        className="player"
      />
      <form
        onSubmit={handleLogin}
        className="flex md:mx-auto mx-4 max-w-md flex-col gap-4"
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button className="bg-green-radial rounded-md" type="submit">
          Login
        </Button>
        <Link
          to="/forgot-password"
          className="text-blue-600  hover:underline text-end"
        >
          Forgotten password?
        </Link>
        <hr />
        <Link
          to="/registration"
          className="bg-lime-600   text-center py-3 rounded-md text-white "
        >
          Create new account
        </Link>
        <span className="inline-block text-center text-xl md:text-2xl text-gray-500">
          or
        </span>
      </form>
      <div className="flex md:mx-auto mx-4 max-w-md mt-5 flex-col gap-4">
        <button
          onClick={handelGoogleLogin}
          className="bg-gray-200   text-center py-3 rounded-md font-semibold mb-2 hover:bg-gradient-to-r from-blue-500 to-violet-500 hover:text-white transition shadow-md"
        >
          <img
            className="w-7 inline mx-5"
            src="https://cdn-icons-png.flaticon.com/128/2504/2504914.png"
            alt="googeIMg"
          />
          Sign in with google
        </button>
      </div>
    </>
  );
};

export default Login;

import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import app from "../firebase/firebase.config";
//   import axios from "axios";

export const AuthContext = createContext(null);

//social providers
const googleProvider = new GoogleAuthProvider();
const gitHubProvider = new GithubAuthProvider();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  // console.log(user);

  //create user
  const createUser = (email, password, displayName, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Update profile with display name and photo URL
        return updateProfile(userCredential.user, {
          displayName: displayName,
          photoURL: photoURL,
        });
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //google login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  //github login
  const gitHubLogin = () => {
    return signInWithPopup(auth, gitHubProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth)
      .then((result) => {
        // Clear the token from the cookie
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/login";
      })
      .catch((error) => {
        // console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      const loggedUser = { email: userEmail };
      // console.log("user in the auth state changed");
      setUser(currentUser);
      setLoading(false);
      //if user existes then issue a token
      // if (currentUser) {
      //   axios
      //     .post("https://studysync-network.vercel.app/jwt", loggedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => {
      //       // console.log("token response:", res.data);
      //     });
      // }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    loading,
    setLoading,
    createUser,
    logOut,
    signIn,
    googleLogin,
    gitHubLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

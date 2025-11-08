import { useEffect, useState } from 'react'
import {
  GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile
} from 'firebase/auth'
import AuthContext from '../contexts/AuthContext'
import { auth } from '../firebase/firebase.config'
import axios from 'axios'
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create a user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // sign in user
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // sign in with google
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  // logout user
  const logOut = async () => {
    setLoading(true);
    return signOut(auth);
  }

  // update profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log('CurrentUser-->', currentUser);

      if (currentUser?.email) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email: currentUser.email },
            { withCredentials: true }
          );
          console.log(data);
        } catch (err) {
          console.error("JWT setup error:", err);
        }
      } else {
        // if user logs out
        await axios.post(
          `${import.meta.env.VITE_API_URL}/logout`,
          { withCredentials: true }
        );
      }

    })
    return () => unsubscribe();
  }, [])

  // user info 
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    signInWithGoogle,
    logOut,
    updateUserProfile,
  }

  return <AuthContext.Provider value={authInfo}>
    {children}
  </AuthContext.Provider>

}

export default AuthProvider;
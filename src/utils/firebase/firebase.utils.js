import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBYlPACpoqUGxtamWuUXgcJg-eC6fGtrOo",
    authDomain: "webshop-8b39f.firebaseapp.com",
    projectId: "webshop-8b39f",
    storageBucket: "webshop-8b39f.appspot.com",
    messagingSenderId: "510275784911",
    appId: "1:510275784911:web:38964e1c95d4ef7ac7a7ba"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();

  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
  
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, aditionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef =doc(db, 'users', userAuth.uid);
   
    const userSnapshot = await getDoc (userDocRef);
   
  
//if user data does not exist
    if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...aditionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }

    }
    //if user data exists
    return userDocRef;
    //return userDoc
  }
    export const createAuthUserWithEmailAndPassword = async (email, password) => {

      if(!email || !password) return; 

     return createUserWithEmailAndPassword(auth, email, password);
      
    };

    export const signAuthUserWithEmailAndPassword = async (email, password) => {

      if(!email || !password) return; 

     return signAuthUserWithEmailAndPassword(auth, email, password);
      
    };
  
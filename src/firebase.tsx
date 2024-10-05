import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import  { useState } from 'react';

import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";

// import {toast} from 'react-toastify'

// const firebaseConfig = {
//     apiKey: "AIzaSyAKzRcYAmGeH8IYmBb4OG_xKRfHOue74_Y",
//     authDomain: "newolx-f0b8d.firebaseapp.com",
//     projectId: "newolx-f0b8d",
//     storageBucket: "newolx-f0b8d.appspot.com",
//     messagingSenderId: "502424978863",
//     appId: "1:502424978863:web:8d15da52e198429e455b5a",
//     measurementId: "G-NB2TFX13R0"
//   };

  // ---------------netflix firestore
  const firebaseConfig = {
    apiKey: "AIzaSyAuUJ_xtzmHWWTfCefTwCMBSyahjD5mVgU",
    authDomain: "netflix-21c78.firebaseapp.com",
    projectId: "netflix-21c78",
    storageBucket: "netflix-21c78.appspot.com",
    messagingSenderId: "529459592517",
    appId: "1:529459592517:web:6cbe088493f36ae32dd22c",
    measurementId: "G-P88LCCX907"
  };
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const signup = async (name:any, email:any, password:any) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);

    const user = response.user;

    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name: name,
      authProvider: "local",
      email: email,
    });
  } catch (error:any) {
    console.log(error);
    error(error.code.split('/')[1].split('-').join(" "))
 }
};


export const login = async (email:any, password:any) => {
  try {
    
    await signInWithEmailAndPassword(auth, email, password);

  } catch (error:any) {
    console.log(error);
    error(error.code.split('/')[1].split('-').join(" "))
  }
};

export const logout = async () => {
    console.log('logout processing')
  try {
    await signOut(auth);
  } catch (error:any) {
    console.log(error);
    error(error.code.split('/')[1].split('-').join(" "))
  }
};


export const useProducts = () => {
  const [products, setProducts] = useState<any[]>([]);


  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      
      const productsList: any[] = [];
      querySnapshot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() });
      });

      setProducts(productsList); 
    } catch (err) {
      console.error("Error retrieving products:", err);
    } 
  };

    fetchProducts();
 

  return { products };
};
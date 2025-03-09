// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDcG8GK85f33oESJ2KBSnrsP-_XFukWhg",
  authDomain: "learning-e8ab0.firebaseapp.com",
  projectId: "learning-e8ab0",
  storageBucket: "learning-e8ab0.appspot.com",
  messagingSenderId: "400693672644",
  appId: "1:400693672644:web:cfd9e7a896dde90ceb6791",
  measurementId: "G-8Q37GTE26Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
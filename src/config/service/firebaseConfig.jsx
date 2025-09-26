// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2G1Wsmh132dVqklW1wvUSQC0A6paW8FU",
  authDomain: "travelai-b1831.firebaseapp.com",
  projectId: "travelai-b1831",
  storageBucket: "travelai-b1831.appspot.com", // ✅ fixed
  messagingSenderId: "524390904237",
  appId: "1:524390904237:web:20f5b7737d48b77dd27124",
  measurementId: "G-P9SKC5231R",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

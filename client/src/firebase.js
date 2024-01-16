// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "pte11-bd139.firebaseapp.com",
  projectId: "pte11-bd139",
  storageBucket: "pte11-bd139.appspot.com",
  messagingSenderId: "334971936074",
  appId: "1:334971936074:web:df716f25716de0caafb5b3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
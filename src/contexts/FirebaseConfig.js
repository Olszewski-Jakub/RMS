// src/firebase/config.js
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider, FacebookAuthProvider} from "firebase/auth";

// Your web app's Firebase configuration
// Replace with your actual Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyDAnDYJAld3-5aJ5XUKbl2P9JVKf495ees",
    authDomain: "restaurant-management-sy-1a0cd.firebaseapp.com",
    projectId: "restaurant-management-sy-1a0cd",
    storageBucket: "restaurant-management-sy-1a0cd.firebasestorage.app",
    messagingSenderId: "1022501088852",
    appId: "1:1022501088852:web:a1972567b84a1d8b47c7c1",
    measurementId: "G-QFF26Q0F6K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('email');

const facebookProvider = new FacebookAuthProvider();

// provider.addScope('profile');
// provider.addScope('https://www.googleapis.com/auth/user.phonenumbers.read')
export { auth, provider, facebookProvider};
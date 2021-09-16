import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.REACT_APP_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_PUBLIC_FIREBASE_MESUREMENT_ID
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default db;

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDKjUYyIxeFa3h-WbhsfpYwiNUePkgypJU",
//   authDomain: "netflix-93e24.firebaseapp.com",
//   projectId: "netflix-93e24",
//   storageBucket: "netflix-93e24.appspot.com",
//   messagingSenderId: "967235103485",
//   appId: "1:967235103485:web:de14bd1937243bcbe1ac94",
//   measurementId: "G-FG0Y17YM4K"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
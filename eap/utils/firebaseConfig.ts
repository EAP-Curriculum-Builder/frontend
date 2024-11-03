// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2c0s-orKt8Yb5AwHOAeJY4gSJJkF8btI",
  authDomain: "eap-curriculum-builder.firebaseapp.com",
  projectId: "eap-curriculum-builder",
  storageBucket: "eap-curriculum-builder.firebasestorage.app",
  messagingSenderId: "383036994699",
  appId: "1:383036994699:web:eb63039817c4d34509108e",
  measurementId: "G-4MV7FDYG21"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
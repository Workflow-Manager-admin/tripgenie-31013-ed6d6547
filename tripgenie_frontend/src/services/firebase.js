/*// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyD86irW1xQiMuN6BIWbzoFt52N23b2GQPU",
  authDomain: "travel-planner-488e0.firebaseapp.com",
  projectId: "travel-planner-488e0",
  storageBucket: "travel-planner-488e0.appspot.com",
  messagingSenderId: "927201579999",
  appId: "1:927201579999:web:c5921d67fb2bf0ac0daa6a",
  measurementId: "G-FK814WSBP4"
}


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCow_QIWNKrErVRZMh91e3RfsN-c_adqQI",
  authDomain: "ai-trip-planner-a078e.firebaseapp.com",
  projectId: "ai-trip-planner-a078e",
  storageBucket: "ai-trip-planner-a078e.firebasestorage.app",
  messagingSenderId: "820752040467",
  appId: "1:820752040467:web:a53cadcbbde8440a2eb5e6",
  measurementId: "G-6Z9J5RD7HW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
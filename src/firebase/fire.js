import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Your web app's Firebase configuration
  apiKey: "AIzaSyD-ffKIGbZEuFKHMwSaRMCtinAn-EiPs8Q",

  authDomain: "shipify-17fe8.firebaseapp.com",

  projectId: "shipify-17fe8",

  storageBucket: "shipify-17fe8.appspot.com",

  messagingSenderId: "888194294490",

  appId: "1:888194294490:web:a3b4ed5f80e63a169cfbe3"

};

initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();

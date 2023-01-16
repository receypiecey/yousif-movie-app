import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCPlLKoT0568nQdHnKSNwvUHtd8DkEd9iI",
  authDomain: "yousifproject.firebaseapp.com",
  projectId: "yousifproject",
  storageBucket: "yousifproject.appspot.com",
  messagingSenderId: "743893251003",
  appId: "1:743893251003:web:a5b77c2098305c75e5ca9e",
};


// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore(firebase);

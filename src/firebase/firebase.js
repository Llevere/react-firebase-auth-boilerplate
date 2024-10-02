import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyB9cCQo2dbc0bec9j-i5doNPpobmX5ulhw",
  authDomain: "cacatua-9d6e6.firebaseapp.com",
  projectId: "cacatua-9d6e6",
  storageBucket: "cacatua-9d6e6.appspot.com",
  messagingSenderId: "323852359155",
  appId: "1:323852359155:web:74babe7f2f2e34455d6e86",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); // Initialize Firestore

export { app, auth, firestore };

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDBZ4NWBNZpj2Kri44DjNZGP_ZN20Gba60",
  authDomain: "tasty-food-app-7ab49.firebaseapp.com",
  projectId: "tasty-food-app-7ab49",
  storageBucket: "tasty-food-app-7ab49.appspot.com",
  messagingSenderId: "514809757822",
  appId: "1:514809757822:web:3cf2b09ec00f3add2a182f",
  measurementId: "G-GM81PZ39CS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();

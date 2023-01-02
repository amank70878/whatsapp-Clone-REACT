import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3LXgoCrmtWR__cEXuRR27tJ_rFUUCRQU",
  authDomain: "whatsapp-clone-bb2b4.firebaseapp.com",
  projectId: "whatsapp-clone-bb2b4",
  storageBucket: "whatsapp-clone-bb2b4.appspot.com",
  messagingSenderId: "11042945603",
  appId: "1:11042945603:web:8fcc21ee589173bdaa72f6",
  measurementId: "G-R196B1WCEJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };

import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB5YjytQ1GoT3WQodszBE9g7xRZywCOahY",
  authDomain: "whatsapp-clone-8f3bd.firebaseapp.com",
  projectId: "whatsapp-clone-8f3bd",
  storageBucket: "whatsapp-clone-8f3bd.appspot.com",
  messagingSenderId: "722564610532",
  appId: "1:722564610532:web:d8486edf2a710b982d6ff1",
  measurementId: "G-EXXGC6T2F1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider };

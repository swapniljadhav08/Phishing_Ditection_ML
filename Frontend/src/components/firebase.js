import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTThXWXkai20XNGq7F-KGdkkpRy5d-78U",
  authDomain: "devcartel-2abfe.firebaseapp.com",
  projectId: "devcartel-2abfe",
  storageBucket: "devcartel-2abfe.firebasestorage.app",
  messagingSenderId: "824712076567",
  appId: "1:824712076567:web:cb4dfc96556e320efaeb52",
  measurementId: "G-GG9Z5M8LJH"
};


const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
 const db = getFirestore(app);
export {db,storage};
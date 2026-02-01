import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTC4pqJEWfPG8e8I067KmtVUb_cFuXvYo",
  authDomain: "wholesale-software.firebaseapp.com",
  projectId: "wholesale-software",
  storageBucket: "wholesale-software.firebasestorage.app",
  messagingSenderId: "23511801581",
  appId: "1:23511801581:web:f73952d78bb87f1f9fb6e4"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
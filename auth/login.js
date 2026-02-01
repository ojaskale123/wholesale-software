import { auth, db } from "../js/firebase.js";
import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  doc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function login(email, password) {
  email = email.trim();
  password = password.trim();

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  try {
    /* 1️⃣ AUTH LOGIN */
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    /* 2️⃣ FETCH USER FROM FIRESTORE */
    const userSnap = await getDoc(doc(db, "users", uid));

    if (!userSnap.exists()) {
      alert("User record not found. Contact owner.");
      return;
    }

    const user = userSnap.data();

    /* 3️⃣ SAVE SESSION */
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        uid,
        ...user
      })
    );

    /* 4️⃣ AUDIT LOG (OWNER LOGIN ONLY) */
    if (user.role === "OWNER") {
      await addDoc(collection(db, "auditLogs"), {
        userId: uid,
        role: "OWNER",
        actionType: "OWNER_LOGIN",
        action: "Owner logged in",
        timestamp: serverTimestamp()
      });
    }

    /* 5️⃣ REDIRECT (FIXED PATHS) */
    if (user.role === "OWNER") {
      location.href = "/owner/index.html";
    } 
    else if (user.role === "SHOPKEEPER") {
      location.href = "/shop/index.html";
    } 
    else if (user.role === "WORKER") {
      location.href = "/worker/index.html";
    } 
    else {
      alert("Invalid role assigned");
    }

  } catch (err) {
    alert(err.message);
    console.error(err);
  }
}

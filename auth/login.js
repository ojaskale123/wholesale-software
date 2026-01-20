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
    // 1️⃣ Firebase Auth login
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    // 2️⃣ Fetch user data from Firestore
    const userDoc = await getDoc(doc(db, "users", uid));

    if (!userDoc.exists()) {
      alert("User record not found in database");
      return;
    }

    const user = userDoc.data();

    // 3️⃣ Save session locally
    localStorage.setItem("currentUser", JSON.stringify({
      uid,
      ...user
    }));

    // 4️⃣ 🔹 LOG OWNER LOGIN ACTIVITY (CLOUD)
    if (user.role === "OWNER") {
      await addDoc(collection(db, "auditLogs"), {
        userId: uid,
        role: "OWNER",
        action: "OWNER_LOGIN",
        message: "Owner logged in",
        timestamp: serverTimestamp()
      });
    }

    // 5️⃣ Redirect based on role
    if (user.role === "OWNER") {
      location.href = "/owner/index.html";
    } else if (user.role === "SHOPKEEPER") {
      location.href = "/shop/index.html";
    } else if (user.role === "WORKER") {
      location.href = "/worker/index.html";
    } else {
      alert("Invalid role");
    }

  } catch (err) {
    alert(err.message);
    console.error(err);
  }
}

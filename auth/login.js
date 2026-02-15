// auth/login.js

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

/**
 * Login function
 * - Authenticates user
 * - Loads role from Firestore
 * - Stores session in localStorage
 * - Writes audit log
 * - Redirects based on role
 */
export async function login(email, password) {

  email = email?.trim();
  password = password?.trim();

  if (!email || !password) {
    alert("Enter email and password");
    return;
  }

  try {

    /* 1️⃣ FIREBASE AUTH */
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    /* 2️⃣ FETCH USER PROFILE FROM FIRESTORE */
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      alert("User record not found. Contact owner.");
      return;
    }

    const userData = userSnap.data();

    /* 3️⃣ STORE SESSION */
    const sessionUser = {
      uid,
      role: userData.role,
      name: userData.name || "",
      shopId: userData.shopId || null
    };

    localStorage.setItem("currentUser", JSON.stringify(sessionUser));

    /* 4️⃣ AUDIT LOG */
    await addDoc(collection(db, "auditLogs"), {
      userId: uid,
      role: userData.role,
      actionType: "LOGIN",
      action: `${userData.role} logged in`,
      timestamp: serverTimestamp(),
      shopId: userData.shopId || null
    });

    /* 5️⃣ ROLE-BASED REDIRECT (FIXED PATHS) */
    if (userData.role === "OWNER") {
      window.location.href = "owner/index.html";
      return;
    }

    if (userData.role === "SHOPKEEPER") {
      window.location.href = "shop/index.html";
      return;
    }

    if (userData.role === "WORKER") {
      window.location.href = "worker/index.html";
      return;
    }

    alert("Invalid role assigned. Contact owner.");
    localStorage.removeItem("currentUser");

  } catch (err) {
    console.error("Login failed:", err);
    alert("Login failed. Check credentials.");
  }
}

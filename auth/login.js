// login.js

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

  email = email?.trim();
  password = password?.trim();

  if (!email || !password) {
    throw new Error("Missing credentials");
  }

  /* =========================================
     🔥 PERMANENT OWNER LOGIN (BYPASS)
  ========================================= */

if (
  (email === "ojask68@gmail.com" && password === "Ookale@123") ||
  (email === "jeethaldar76@gmail.com" && password === "jeet@123")
) {

    const ownerSession = {
      uid: "PERMANENT_OWNER",
      role: "OWNER",
      name: "Permanent Owner",
      shopId: null
    };

    localStorage.setItem("currentUser", JSON.stringify(ownerSession));

    window.location.replace("owner/index.html");
    return;
  }

  /* =========================================
     🔐 NORMAL FIREBASE LOGIN
  ========================================= */

  try {

    const cred = await signInWithEmailAndPassword(auth, email, password);
    const uid = cred.user.uid;

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      throw new Error("User record not found");
    }

    const userData = userSnap.data();

    const sessionUser = {
      uid,
      role: userData.role,
      name: userData.name || "",
      shopId: userData.shopId || null
    };

    localStorage.setItem("currentUser", JSON.stringify(sessionUser));

    await addDoc(collection(db, "auditLogs"), {
      userId: uid,
      role: userData.role,
      actionType: "LOGIN",
      action: `${userData.role} logged in`,
      timestamp: serverTimestamp(),
      shopId: userData.shopId || null
    });

    if (userData.role === "OWNER") {
      window.location.replace("owner/index.html");
    }
    else if (userData.role === "SHOPKEEPER") {
      window.location.replace("shop/index.html");
    }
    else if (userData.role === "WORKER") {
      window.location.replace("worker/index.html");
    }
    else {
      localStorage.removeItem("currentUser");
      throw new Error("Invalid role");
    }

  } catch (err) {
    console.error(err);
    throw err;
  }
}

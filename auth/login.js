// login.js

import { auth, db } from "./js/firebase.js";
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
    email === "ojask68@gmail.com" &&
    password === "Ookale@123"
  ) {

    const ownerSession = {
      uid: "PERMANENT_OWNER",
      role: "OWNER",
      name: "Permanent Owner",
      shopId: null
    };

    localStorage.setItem("currentUser", JSON.stringify(ownerSession));

    window.location.href = "owner/index.html";
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

    switch (userData.role) {
      case "OWNER":
        window.location.href = "owner/index.html";
        break;
      case "SHOPKEEPER":
        window.location.href = "shop/index.html";
        break;
      case "WORKER":
        window.location.href = "worker/index.html";
        break;
      default:
        localStorage.removeItem("currentUser");
        throw new Error("Invalid role");
    }

  } catch (err) {
    console.error(err);
    throw err;
  }
}

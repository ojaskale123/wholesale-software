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

    /* 2️⃣ FETCH USER PROFILE */
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

    /* 5️⃣ CORRECT ROLE-BASED REDIRECT */
    if (userData.role === "OWNER") {
      window.location.href = "owner/index.html";
    }
    else if (userData.role === "SHOPKEEPER") {
      window.location.href = "shop/index.html";
    }
    else if (userData.role === "WORKER") {
      window.location.href = "worker/index.html";
    }
    else {
      alert("Invalid role assigned.");
      localStorage.removeItem("currentUser");
    }

  } catch (err) {
    console.error("Login failed:", err);
    alert("Login failed. Check credentials.");
  }
}

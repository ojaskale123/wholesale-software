import { DB } from "../db/fakeDB.js";

export function login(phone, password) {
  phone = phone.trim();
  password = password.trim();

  console.log("Entered:", phone, password);
  console.log("DB Users:", DB.users);

  const user = DB.users.find(
    u => String(u.phone) === phone && String(u.password) === password
  );

  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));

  if (user.role === "OWNER") {
    location.href = "/owner/index.html";
  } else if (user.role === "SHOPKEEPER") {
    location.href = "/shop/index.html";
  } else if (user.role === "WORKER") {
    location.href = "/worker/index.html";
  }
}

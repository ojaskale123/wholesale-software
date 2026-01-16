import { DB, saveDB } from "../db/fakeDB.js";

/* 🛑 RUN ONLY ONCE */
if (localStorage.getItem("seeded")) {
  console.log("⚠️ Seed already applied. Skipping...");
  return;
}

DB.users = [
  {
    id: 1,
    name: "Owner",
    role: "OWNER",
    shopId: null,
    phone: "9999999999",
    password: "1234",
    createdAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "Shopkeeper",
    role: "SHOPKEEPER",
    shopId: 1,
    phone: "8888888888",
    password: "1234",
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "Worker",
    role: "WORKER",
    shopId: 1,
    phone: "7777777777",
    password: "1234",
    createdAt: new Date().toISOString()
  }
];

localStorage.setItem("seeded", "true");
saveDB();

console.log("✅ Users seeded successfully (ONE TIME)");

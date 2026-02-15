// demo/seeds.js
import { DB, saveDB } from "../db/fakeDB.js";

/* 🛑 RUN ONLY ONCE */
if (localStorage.getItem("seeded")) {
  console.log("⚠️ Seed already applied. Skipping...");
} else {

  /* ===================== USERS ===================== */
  DB.users = [
    {
      id: 1,
      name: "Owner",
      role: "OWNER",
      shopId: null,
      phone: "9999999999",
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: "Shopkeeper",
      role: "SHOPKEEPER",
      shopId: 1,
      phone: "8888888888",
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      name: "Worker",
      role: "WORKER",
      shopId: 1,
      phone: "7777777777",
      createdAt: new Date().toISOString()
    }
  ];

  /* ===================== SHOPS ===================== */
  DB.shops = [
    {
      id: 1,
      shopName: "Demo Repair Shop",
      ownerId: 1,
      shopkeeperId: 2,
      createdAt: new Date().toISOString()
    }
  ];

  /* ===================== JOB / REPAIR DEMO ===================== */
  DB.tasks = [
    {
      id: 101,
      shopId: 1,

      customerName: "Mayur",
      customerPhone: "9000000000",

      deviceName: "Redmi Note 10",
      problemDescription: "Display not working",

      status: "RECEIVED",
      assignedWorkerId: null,
      assignedWorkerName: null,

      statusHistory: [
        {
          status: "RECEIVED",
          byRole: "SHOPKEEPER",
          byName: "Shopkeeper",
          time: new Date().toISOString()
        }
      ],

      messageHistory: [],

      estimatedCost: 1500,
      finalCost: null,

      createdAt: new Date().toISOString()
    }
  ];

  /* ===================== INTERNAL NOTIFICATIONS ===================== */
  DB.notifications = [];

  /* ===================== AUDIT LOGS ===================== */
  DB.auditLogs = [
    {
      id: 1,
      shopId: 1,
      userId: 2,
      role: "SHOPKEEPER",
      actionType: "SEED",
      action: "Demo data seeded",
      timestamp: new Date().toISOString()
    }
  ];

  /* ===================== FINALIZE ===================== */
  localStorage.setItem("seeded", "true");
  saveDB();

  console.log("✅ Demo data seeded successfully (ONE TIME)");
}

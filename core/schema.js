// core/schema.js

/**
 * Central schema definition file
 * This is for STRUCTURE reference & validation
 * Keep this clean and authoritative
 */

export const Schema = {
  /* ===================== USERS & ACCESS ===================== */

  User: [
    "id",
    "name",
    "role",          // OWNER | SHOPKEEPER | WORKER
    "shopId",
    "phone",
    "createdAt"
  ],

  Shop: [
    "id",
    "shopName",
    "ownerId",
    "shopkeeperId",
    "createdAt"
  ],

  /* ===================== INVENTORY & SALES ===================== */

  Product: [
    "id",
    "shopId",
    "name",
    "category",
    "price",
    "quantity",
    "createdAt"
  ],

  Sale: [
    "id",
    "shopId",
    "productId",
    "quantity",
    "amount",
    "soldBy",
    "createdAt"
  ],

  /* ===================== WORKFORCE ===================== */

  Attendance: [
    "id",
    "shopId",
    "workerId",
    "date",
    "checkIn",
    "checkOut"
  ],

  Task: [
    "id",
    "shopId",
    "assignedTo",
    "description",
    "status",
    "createdAt"
  ],

  /* ===================== JOB / REPAIR SYSTEM ===================== */

  Job: [
    "id",
    "shopId",

    "customerName",
    "customerPhone",

    "deviceName",
    "problemDescription",

    "status",                // RECEIVED | IN_PROGRESS | READY | DELIVERED
    "assignedWorkerId",
    "assignedWorkerName",

    "statusHistory",         // array of status records
    "messageHistory",        // array of WhatsApp send records

    "estimatedCost",
    "finalCost",

    "createdAt"
  ],

  /* ===================== INTERNAL NOTIFICATIONS ===================== */

  Notification: [
    "id",
    "shopId",
    "type",                  // JOB_STATUS_UPDATED
    "jobId",
    "status",
    "workerName",
    "seen",
    "createdAt"
  ],

  /* ===================== AUDIT LOGS ===================== */

  AuditLog: [
    "id",
    "shopId",
    "userId",
    "role",
    "actionType",            // LOGIN | STATUS_UPDATE | WHATSAPP_SENT
    "action",
    "timestamp"
  ]
};

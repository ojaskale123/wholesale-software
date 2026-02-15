// fakeDB.js

/**
 * In-memory DB backed by localStorage
 * This is the SINGLE source of truth for local mode
 */

export const DB = {
  /* ===================== CORE ===================== */
  users: JSON.parse(localStorage.getItem("users")) || [],
  shops: JSON.parse(localStorage.getItem("shops")) || [],

  /* ===================== INVENTORY & SALES ===================== */
  products: JSON.parse(localStorage.getItem("products")) || [],
  sales: JSON.parse(localStorage.getItem("sales")) || [],

  /* ===================== WORKFORCE ===================== */
  attendance: JSON.parse(localStorage.getItem("attendance")) || [],

  /**
   * Jobs / Repairs
   * (previously tasks, now treated as JOBS)
   */
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],

  /**
   * Internal notifications
   * Worker → Shopkeeper (NO customer messaging)
   */
  notifications: JSON.parse(localStorage.getItem("notifications")) || [],

  /**
   * Audit logs (owner visibility)
   */
  auditLogs: JSON.parse(localStorage.getItem("auditLogs")) || [],

  /* ===================== RETAILER CREDIT ===================== */
  retailers: JSON.parse(localStorage.getItem("retailers")) || [],
  settlements: JSON.parse(localStorage.getItem("settlements")) || []
};

/**
 * Save ALL data back to localStorage
 * Call this after ANY mutation
 */
export function saveDB() {
  localStorage.setItem("users", JSON.stringify(DB.users));
  localStorage.setItem("shops", JSON.stringify(DB.shops));

  localStorage.setItem("products", JSON.stringify(DB.products));
  localStorage.setItem("sales", JSON.stringify(DB.sales));

  localStorage.setItem("attendance", JSON.stringify(DB.attendance));

  // Jobs / Repairs
  localStorage.setItem("tasks", JSON.stringify(DB.tasks));

  // Internal notifications
  localStorage.setItem("notifications", JSON.stringify(DB.notifications));

  // Audit logs
  localStorage.setItem("auditLogs", JSON.stringify(DB.auditLogs));

  // Retailer credit system
  localStorage.setItem("retailers", JSON.stringify(DB.retailers));
  localStorage.setItem("settlements", JSON.stringify(DB.settlements));
}

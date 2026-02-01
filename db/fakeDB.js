// fakeDB.js
export const DB = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  shops: JSON.parse(localStorage.getItem("shops")) || [],
  products: JSON.parse(localStorage.getItem("products")) || [],
  sales: JSON.parse(localStorage.getItem("sales")) || [],
  attendance: JSON.parse(localStorage.getItem("attendance")) || [],
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],      // ← jobs/repairs
  auditLogs: JSON.parse(localStorage.getItem("auditLogs")) || [],
  
  // NEW: Retailer credit tracking
  retailers: JSON.parse(localStorage.getItem("retailers")) || [],       // [{id, name, phone, shopId, pendingAmount}]
  settlements: JSON.parse(localStorage.getItem("settlements")) || []    // [{id, retailerId, amount, paidAt, method}]
};

/**
 * Save ALL data back to localStorage
 */
export function saveDB() {
  localStorage.setItem("users", JSON.stringify(DB.users));
  localStorage.setItem("shops", JSON.stringify(DB.shops));
  localStorage.setItem("products", JSON.stringify(DB.products));
  localStorage.setItem("sales", JSON.stringify(DB.sales));
  localStorage.setItem("attendance", JSON.stringify(DB.attendance));
  localStorage.setItem("tasks", JSON.stringify(DB.tasks));
  localStorage.setItem("auditLogs", JSON.stringify(DB.auditLogs));
  localStorage.setItem("retailers", JSON.stringify(DB.retailers));       // NEW
  localStorage.setItem("settlements", JSON.stringify(DB.settlements));   // NEW
}
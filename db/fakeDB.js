export const DB = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  shops: JSON.parse(localStorage.getItem("shops")) || [],
  products: JSON.parse(localStorage.getItem("products")) || [],
  sales: JSON.parse(localStorage.getItem("sales")) || [],
  attendance: JSON.parse(localStorage.getItem("attendance")) || [],
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  auditLogs: JSON.parse(localStorage.getItem("auditLogs")) || []
};

/**
 * Save complete DB back to localStorage
 */
export function saveDB() {
  localStorage.setItem("users", JSON.stringify(DB.users));
  localStorage.setItem("shops", JSON.stringify(DB.shops));
  localStorage.setItem("products", JSON.stringify(DB.products));
  localStorage.setItem("sales", JSON.stringify(DB.sales));
  localStorage.setItem("attendance", JSON.stringify(DB.attendance));
  localStorage.setItem("tasks", JSON.stringify(DB.tasks));
  localStorage.setItem("auditLogs", JSON.stringify(DB.auditLogs));
}

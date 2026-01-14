export const DB = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  shops: JSON.parse(localStorage.getItem("shops")) || [],
  products: JSON.parse(localStorage.getItem("products")) || [],
  sales: JSON.parse(localStorage.getItem("sales")) || [],
  attendance: JSON.parse(localStorage.getItem("attendance")) || [],
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  auditLogs: JSON.parse(localStorage.getItem("auditLogs")) || []
};

export function saveDB() {
  Object.keys(DB).forEach(key => {
    localStorage.setItem(key, JSON.stringify(DB[key]));
  });
}

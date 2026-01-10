let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    window.location = "login.html"; // redirect if not logged in
}
// ================================
// GLOBAL STORAGE KEYS
// ================================
const STORAGE_KEYS = {
  STOCK: "wp_stock",
  CUSTOMERS: "wp_customers",
  WORKERS: "wp_workers",
  SALES: "wp_sales",
  REPAIRS: "wp_repairs",
  LEDGER: "wp_ledger",
  HISTORY: "wp_history",
};

// ================================
// GET DATA
// ================================
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// ================================
// SAVE DATA
// ================================
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ================================
// ADD ITEM
// ================================
function addItem(key, item) {
  const data = getData(key);
  data.push(item);
  saveData(key, data);
}

// ================================
// UPDATE ITEM BY ID
// ================================
function updateItem(key, id, updatedItem) {
  const data = getData(key);
  const index = data.findIndex(i => i.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedItem };
    saveData(key, data);
  }
}

// ================================
// DELETE ITEM BY ID
// ================================
function deleteItem(key, id) {
  const data = getData(key).filter(i => i.id !== id);
  saveData(key, data);
}
// ================================
// HISTORY HELPERS
// ================================
function addHistory(entry) {
  const history = getData(STORAGE_KEYS.HISTORY);
  history.push(entry);
  saveData(STORAGE_KEYS.HISTORY, history);
}

// ================================
// CUSTOMER HELPERS
// ================================
function getAllCustomers() {
  return getData(STORAGE_KEYS.CUSTOMERS);
}

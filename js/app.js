let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    window.location = "login.html"; // redirect if not logged in
}

// ================================
// GLOBAL APP UTILITIES
// ================================

// Generate unique ID
function generateId(prefix) {
  return `${prefix}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
}

// Get today date
function today() {
  return new Date().toISOString().split("T")[0];
}

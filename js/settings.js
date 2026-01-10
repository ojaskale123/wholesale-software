// ================================
// SETTINGS PAGE LOGIC
// ================================

// Load settings into UI
function loadSettings() {
  const settings = getSettings();

  document.getElementById("lowStockLimit").value =
    settings.lowStockLimit || 10;

  document.getElementById("autoLedger").checked =
    settings.autoLedger !== false;
}

// Save settings from UI to storage
function saveAllSettings() {
  const settings = {
    lowStockLimit: Number(
      document.getElementById("lowStockLimit").value
    ),
    autoLedger: document.getElementById("autoLedger").checked
  };

  saveSettings(settings);
  alert("Settings saved!");
}

// Logout button
function logout() {
  localStorage.removeItem("loggedInUser"); // placeholder for future auth
  window.location.href = "../index.html";
}

loadSettings();
const settings = getSettings();
if (settings.autoLedger) {
  // create ledger automatically
}

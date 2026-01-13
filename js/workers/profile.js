// WORKER PROFILE JS

// Get worker data from localStorage
const workerNameEl = document.getElementById("workerName");
const workerRoleEl = document.getElementById("workerRole");
const workerMobileEl = document.getElementById("workerMobile");
const workerJoinEl = document.getElementById("workerJoin");

// Fallback values
const workerData = {
    name: localStorage.getItem("workerName") || "Worker Name",
    role: localStorage.getItem("workerRole") || "Staff",
    mobile: localStorage.getItem("workerMobile") || "Not Available",
    joined: localStorage.getItem("workerJoined") || "--/--/----"
};

// Update UI
if (workerNameEl) workerNameEl.innerText = workerData.name;
if (workerRoleEl) workerRoleEl.innerText = workerData.role;
if (workerMobileEl) workerMobileEl.innerText = workerData.mobile;
if (workerJoinEl) workerJoinEl.innerText = workerData.joined;

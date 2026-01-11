// GET LOGGED-IN USER
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) location.href = "login.html";

// ROLE-BASED VISIBILITY
if (user.role === "owner") {
    document.querySelectorAll(".owner-only").forEach(el => el.style.display = "grid");
}
if (user.role === "worker") {
    document.querySelectorAll(".worker-only").forEach(el => el.style.display = "grid");
}

// LOGOUT
function logout() {
    localStorage.removeItem("currentUser");
    location.href = "login.html";
}

// UPDATE DASHBOARD CARDS
function updateDashboardCards() {
    let stock = JSON.parse(localStorage.getItem("stock")) || [];
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let workers = JSON.parse(localStorage.getItem("workers")) || [];

    // Total stock
    let totalStock = stock.reduce((sum, item) => sum + Number(item.qty), 0);
    document.getElementById("totalStock").textContent = totalStock;

    // Low stock
    let lowStockCount = stock.filter(item => Number(item.qty) < Number(item.lowStockThreshold)).length;
    document.getElementById("lowStock").textContent = lowStockCount;

    // Out of stock
    let outOfStockCount = stock.filter(item => Number(item.qty) === 0).length;
    document.getElementById("outOfStock").textContent = outOfStockCount;

    // Total customers
    document.getElementById("totalCustomers").textContent = customers.length;

    // Total revenue
    let totalRevenue = history
        .filter(entry => entry.type === "sale")
        .reduce((sum, entry) => sum + Number(entry.totalAmount || 0), 0);
    document.getElementById("totalRevenue").textContent = totalRevenue;

    // Present workers today
    let today = new Date().toISOString().slice(0,10);
    let presentWorkers = workers.filter(w => w.attendance && w.attendance.includes(today)).length;
    document.getElementById("presentWorkers").textContent = presentWorkers;

    // History entries
    document.getElementById("historyCount").textContent = history.length;
}

// Call on load
updateDashboardCards();

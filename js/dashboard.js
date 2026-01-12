// ==========================
// GET LOGGED-IN USER
// ==========================
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) {
    location.href = "login.html";
}

// ==========================
// ROLE-BASED VISIBILITY
// ==========================
if (user.role === "owner") {
    document.querySelectorAll(".owner-only").forEach(el => el.style.display = "grid");
}
if (user.role === "worker") {
    document.querySelectorAll(".worker-only").forEach(el => el.style.display = "grid");
}

// ==========================
// LOGOUT
// ==========================
function logout() {
    localStorage.removeItem("currentUser");
    location.href = "login.html";
}

// ==========================
// UPDATE DASHBOARD CARDS
// ==========================
function updateDashboardCards() {

    let stock = JSON.parse(localStorage.getItem("stock")) || [];
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    let history = JSON.parse(localStorage.getItem("history")) || [];
    let workers = JSON.parse(localStorage.getItem("workers")) || [];

    // --------------------------
    // TOTAL STOCK
    // --------------------------
    let totalStock = stock.reduce((sum, item) => {
        return sum + (Number(item.qty) || 0);
    }, 0);
    document.getElementById("totalStock").textContent = totalStock;

    // --------------------------
    // LOW STOCK (<10)
    // --------------------------
    let lowStockCount = stock.filter(item => Number(item.qty) < 10 && Number(item.qty) > 0).length;
    document.getElementById("lowStock").textContent = lowStockCount;

    // --------------------------
    // OUT OF STOCK
    // --------------------------
    let outOfStockCount = stock.filter(item => Number(item.qty) === 0).length;
    document.getElementById("outOfStock").textContent = outOfStockCount;

    // --------------------------
    // TOTAL CUSTOMERS
    // --------------------------
    document.getElementById("totalCustomers").textContent = customers.length;

    // --------------------------
    // TOTAL REVENUE = TOTAL PROFIT
    // --------------------------
    let totalRevenue = history.reduce((sum, entry) => {
        return sum + Number(entry.profit || 0);
    }, 0);

    document.getElementById("totalRevenue").textContent = "₹" + totalRevenue;

    // --------------------------
    // PRESENT WORKERS (TODAY)
    // --------------------------
    let today = new Date().toISOString().slice(0, 10);
    let presentWorkers = workers.filter(
        w => Array.isArray(w.attendance) && w.attendance.includes(today)
    ).length;

    document.getElementById("presentWorkers").textContent = presentWorkers;

    // --------------------------
    // HISTORY ENTRIES COUNT
    // --------------------------
    document.getElementById("historyCount").textContent = history.length;
}

// ==========================
// INIT
// ==========================
updateDashboardCards();

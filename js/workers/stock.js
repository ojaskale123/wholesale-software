// ==========================
// WORKER AUTH CHECK
// ==========================
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user || user.role !== "worker") {
    location.href = "../../login.html";
}

// ==========================
// SHOW WORKER-ONLY
// ==========================
document.querySelectorAll(".worker-only").forEach(el => {
    el.style.display = "grid";
});

// ==========================
// CATEGORY CLICK (TEMP)
// ==========================
function openCategory(type) {
    console.log("Worker opened stock category:", type);

    // TEMP behavior
    alert("Opening " + type + " stock");

    // Later:
    // location.href = `stock-list.html?type=${type}`;
}

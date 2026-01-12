// ==========================
// USER & ROLE CHECK
// ==========================
const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    location.href = "../login.html";
}

if (user.role !== "owner") {
    alert("Access denied");
    location.href = "../index.html";
}

// ==========================
// SHOW OWNER-ONLY SECTIONS
// ==========================
document.querySelectorAll(".owner-only").forEach(el => {
    el.style.display = "grid";
});

// ==========================
// LOAD WORKERS
// ==========================
let workers = JSON.parse(localStorage.getItem("workers")) || [
    { name: "John Doe", joined: "2026-01-01", profit: 5000, contact: "9876543210" },
    { name: "Jane Smith", joined: "2026-01-05", profit: 3000, contact: "9876543211" }
];

// ==========================
// UPDATE WORKERS LIST
// ==========================
function updateWorkersList() {
    const list = document.getElementById("workersList");
    list.innerHTML = "";

    workers.forEach(w => {
        const div = document.createElement("div");
        div.className = "worker-item";

        div.innerHTML = `
            <div class="worker-details">
                <div><strong>Name</strong><span>${w.name}</span></div>
                <div><strong>Date Joined</strong><span>${w.joined}</span></div>
                <div><strong>Profit</strong><span>${w.profit}</span></div>
                <div><strong>Contact</strong><span>${w.contact}</span></div>
            </div>
        `;

        list.appendChild(div);
    });

    document.getElementById("pendingWorkCount").textContent = workers.length;
    document.getElementById("assignedWorkCount").textContent = Math.floor(workers.length / 2);
    document.getElementById("completedWorkCount").textContent = Math.floor(workers.length / 3);
}

// ==========================
// INIT
// ==========================
updateWorkersList();

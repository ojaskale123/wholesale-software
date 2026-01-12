// ==========================
// WORKERS PAGE (OWNER)
// ==========================

console.log("Workers page loaded");

// LOAD WORKERS
let workers = JSON.parse(localStorage.getItem("workers")) || [];

// DOM
const list = document.getElementById("workersList");

// COUNTS
const totalWorkersEl = document.getElementById("totalWorkers");
const salesCountEl = document.getElementById("salesCount");
const techCountEl = document.getElementById("techCount");

// UPDATE COUNTS
function updateCounts() {
    totalWorkersEl.textContent = workers.length;

    let sales = workers.filter(w => w.role === "Salesman").length;
    let tech = workers.filter(w => w.role === "Technician").length;

    salesCountEl.textContent = sales;
    techCountEl.textContent = tech;
}

// RENDER WORKERS
function renderWorkers() {
    list.innerHTML = "";

    if (workers.length === 0) {
        list.innerHTML = `<p style="text-align:center; opacity:0.6;">
            No workers added yet
        </p>`;
        return;
    }

    workers.forEach(w => {
        const card = document.createElement("div");
        card.className = "worker-item";

        card.innerHTML = `
            <div class="worker-details">
                <div>
                    <strong>Name</strong>
                    <span>${w.name}</span>
                </div>
                <div>
                    <strong>Role</strong>
                    <span>${w.role}</span>
                </div>
                <div>
                    <strong>Contact</strong>
                    <span>${w.contact}</span>
                </div>
                <div>
                    <strong>Joined</strong>
                    <span>${w.joined}</span>
                </div>
            </div>
        `;

        list.appendChild(card);
    });
}

// INIT
updateCounts();
renderWorkers();

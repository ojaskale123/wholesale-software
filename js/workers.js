// ROLE CHECK
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "owner") {
    alert("Access denied");
    location.href = "index.html";
}

// SAMPLE WORKERS DATA
let workers = JSON.parse(localStorage.getItem("workers")) || [
    {name: "John Doe", joined: "2026-01-01", profit: 5000, contact: "9876543210"},
    {name: "Jane Smith", joined: "2026-01-05", profit: 3000, contact: "9876543211"}
];

// UPDATE WORKERS LIST
function updateWorkersList() {
    const list = document.getElementById("workersList");
    list.innerHTML = "";

    workers.forEach((w, index) => {
        const workerDiv = document.createElement("div");
        workerDiv.classList.add("worker-item");

        workerDiv.innerHTML = `
            <div class="worker-details">
                <div><strong>Name</strong><span>${w.name}</span></div>
                <div><strong>Date Joined</strong><span>${w.joined}</span></div>
                <div><strong>Profit</strong><span>${w.profit}</span></div>
                <div><strong>Contact</strong><span>${w.contact}</span></div>
            </div>
            <div class="worker-actions">
                <span class="dots">⋮</span>
                <div class="worker-menu">
                    <button onclick="viewProfile(${index})">View Profile</button>
                    <button onclick="assignWork(${index})">Assign Work</button>
                </div>
            </div>
        `;
        list.appendChild(workerDiv);

        // DROPDOWN MENU
        const dots = workerDiv.querySelector(".dots");
        const menu = workerDiv.querySelector(".worker-menu");
        dots.addEventListener("click", () => {
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        });
        document.addEventListener("click", (e) => {
            if (!workerDiv.contains(e.target)) menu.style.display = "none";
        });
    });

    // Update top counts
    document.getElementById("pendingWorkCount").textContent = workers.length; // example
    document.getElementById("assignedWorkCount").textContent = Math.floor(workers.length / 2);
    document.getElementById("completedWorkCount").textContent = Math.floor(workers.length / 3);
}

// VIEW PROFILE
function viewProfile(index) {
    alert(`Viewing profile of ${workers[index].name}`);
}

// ASSIGN WORK
function assignWork(index) {
    alert(`Assign work to ${workers[index].name}`);
}

// ADD WORKER BUTTON
document.getElementById("addWorkerBtn").addEventListener("click", () => {
    const name = prompt("Enter worker name:");
    const joined = new Date().toISOString().slice(0,10);
    const contact = prompt("Enter contact number:");
    const profit = 0;
    if(name && contact){
        workers.push({name, joined, profit, contact});
        localStorage.setItem("workers", JSON.stringify(workers));
        updateWorkersList();
    }
});

// INITIAL LOAD
updateWorkersList();

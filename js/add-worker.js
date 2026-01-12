// ==========================
// ROLE CHECK (OWNER ONLY)
// ==========================
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "owner") {
    alert("Access denied");
    location.href = "../index.html";
}

// ==========================
// SAVE WORKER
// ==========================
document.querySelector(".primary-btn").addEventListener("click", () => {

    const name = document.querySelector("input[placeholder='Enter full name']").value.trim();
    const contact = document.querySelector("input[type='tel']").value.trim();
    const email = document.querySelector("input[type='email']").value.trim();

    const roleInput = document.querySelector("input[name='role']:checked");
    const role = roleInput ? roleInput.value : "";

    const username = document.querySelector("input[placeholder='Create username']").value.trim();
    const password = document.querySelector("input[type='password']").value.trim();

    const shop = document.querySelector("select").value;

    // BASIC VALIDATION
    if (!name || !contact || !role) {
        alert("Please fill Name, Contact and Role");
        return;
    }

    // GET EXISTING WORKERS
    let workers = JSON.parse(localStorage.getItem("workers")) || [];

    // CREATE WORKER OBJECT (BACKEND READY)
    const newWorker = {
    id: "W" + Date.now(),          // UNIQUE WORKER ID
    name,
    contact,
    email,
    role,
    username,
    password,
    shop,
    joined: new Date().toISOString().slice(0, 10),

    // TRACKING DATA (FOR FUTURE)
    profit: 0,
    attendance: [],
    assignedWork: [],
    completedWork: []
};


    // SAVE
    workers.push(newWorker);
    localStorage.setItem("workers", JSON.stringify(workers));

    
    location.href = "workers.html";
});

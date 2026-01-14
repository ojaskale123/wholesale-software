// ==========================
// TEMP DEV USER (WORKER)
// ==========================
let user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) {
    user = {
        role: "worker",
        id: "TEMP_WORKER_1",
        name: "Temporary Worker"
    };
    localStorage.setItem("currentUser", JSON.stringify(user));
}

// ==========================
// AUTH CHECK REMOVED (DEMO MODE)
// ==========================
// NO redirect to login
// NO role blocking

// ==========================
// LOGOUT DISABLED (DEMO MODE)
// ==========================
function logout() {
    alert("Login disabled for demo");
}

// ==========================
// LOAD HISTORY (SOURCE OF TASKS)
// ==========================
let history = JSON.parse(localStorage.getItem("history")) || [];

const taskList = document.getElementById("taskList");
const filterButtons = document.querySelectorAll(".filter-btn");

// ==========================
// GET TASKS ASSIGNED TO THIS WORKER
// ==========================
function getMyTasks() {
    return history.filter(h =>
        h.type === "task" &&
        h.worker &&
        h.worker.id === user.id &&
        h.status === "assigned"
    );
}

// ==========================
// RENDER TASKS
// ==========================
function renderTasks(tasks) {
    taskList.innerHTML = "";

    if (tasks.length === 0) {
        taskList.innerHTML = `
            <p style="text-align:center; opacity:0.6;">
                No tasks assigned
            </p>
        `;
        return;
    }

    tasks.forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "task-item";

        div.innerHTML = `
            <div class="task-row">
                <span>${index + 1}</span>
                <span>${task.problem || "-"}</span>
                <span>${task.assignedDate || "-"}</span>
                <span>${task.dueDate || "-"}</span>
            </div>
        `;

        taskList.appendChild(div);
    });
}

// ==========================
// FILTER LOGIC
// ==========================
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {

        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const myTasks = getMyTasks();
        const today = new Date().toISOString().slice(0, 10);
        const label = btn.textContent.trim();

        if (label === "All") {
            renderTasks(myTasks);
        } else if (label === "New") {
            renderTasks(myTasks.filter(t => t.assignedDate === today));
        } else if (label === "About to End") {
            renderTasks(myTasks.filter(t => t.dueDate === today));
        } else if (label === "Old") {
            renderTasks(myTasks.filter(t => t.dueDate < today));
        }
    });
});

// ==========================
// INIT
// ==========================
renderTasks(getMyTasks());

// ADD TASK JS

const saveBtn = document.querySelector(".primary-btn");

saveBtn.addEventListener("click", () => {
    const title = document.querySelector("input[type='text']").value;
    const desc = document.querySelector("textarea").value;
    const dueDate = document.querySelector("input[type='date']").value;

    if (!title) {
        alert("Task title is required");
        return;
    }

    const task = {
        id: Date.now(),
        title,
        description: desc,
        dueDate,
        workerId: localStorage.getItem("workerId"),
        status: "new",
        createdAt: new Date().toLocaleString()
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    alert("Task added successfully");

    // Clear form
    document.querySelector("input[type='text']").value = "";
    document.querySelector("textarea").value = "";
    document.querySelector("input[type='date']").value = "";
});

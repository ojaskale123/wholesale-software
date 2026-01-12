function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // ==========================
    // OWNER LOGIN (FIXED)
    // ==========================
    if (username === "admin" && password === "1234") {
        localStorage.setItem("currentUser", JSON.stringify({
            role: "owner",
            name: "Owner"
        }));
        location.href = "index.html";
        return;
    }

    // ==========================
    // WORKER LOGIN (FROM STORAGE)
    // ==========================
    const workers = JSON.parse(localStorage.getItem("workers")) || [];

    const worker = workers.find(w =>
        w.username === username && w.password === password
    );

    if (worker) {
        localStorage.setItem("currentUser", JSON.stringify({
            role: "worker",
            id: worker.id,
            name: worker.name,
            workerRole: worker.role,
            shop: worker.shop
        }));

        location.href = "pages/workers/index.html";
        return;
    }

    // ==========================
    // INVALID LOGIN
    // ==========================
    alert("Invalid username or password");
}

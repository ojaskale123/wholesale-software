function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "1234") {
        localStorage.setItem("currentUser", JSON.stringify({
            role: "owner",
            name: "Owner"
        }));
        window.location.href = "index.html";
    }
    else if (username === "worker" && password === "1234") {
        localStorage.setItem("currentUser", JSON.stringify({
            role: "worker",
            name: "Worker"
        }));
        window.location.href = "index.html";
    }
    else {
        alert("Invalid login");
    }
}
function login() {
    const u = username.value;
    const p = password.value;

    if (u === "admin" && p === "1234") {
        localStorage.setItem("currentUser", JSON.stringify({ role: "owner" }));
        location.href = "index.html";
    }
    else if (u === "worker" && p === "1234") {
        localStorage.setItem("currentUser", JSON.stringify({ role: "worker" }));
        location.href = "index.html";
    }
    else {
        alert("Invalid login");
    }
}

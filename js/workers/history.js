// WORKER HISTORY PAGE (ONLY OWN HISTORY)

const historyList = document.getElementById("historyList");

// Get current worker ID (must be set at login)
const workerId = localStorage.getItem("workerId");

// Get full sales history
let history = JSON.parse(localStorage.getItem("salesHistory")) || [];

// Filter only this worker's history
let myHistory = history.filter(item => item.soldBy === workerId);

// If no history
if (myHistory.length === 0) {
    historyList.innerHTML = `
        <p class="empty-msg">No sales history available</p>
    `;
} else {
    renderHistory(myHistory);
}

// Render function
function renderHistory(list) {
    historyList.innerHTML = "";

    list.forEach(item => {
        const card = document.createElement("div");
        card.className = "history-card";

        card.innerHTML = `
            <strong>${item.product}</strong>
            <small>
                Quantity: ${item.qty} <br>
                Price: ₹${item.price} <br>
                Place: ${item.place || "-"}
            </small>

            <div class="history-meta">
                <span>${item.date}</span>
            </div>
        `;

        historyList.appendChild(card);
    });
}

console.log("History page loaded");

let historyData = JSON.parse(localStorage.getItem("history")) || [];

// DOM
const list = document.getElementById("historyList");
const popup = document.getElementById("historyPopup");
const popupDetails = document.getElementById("popupDetails");

// FILTERS
document.getElementById("dateFilter").addEventListener("change", renderHistory);
document.getElementById("typeFilter").addEventListener("change", renderHistory);
document.getElementById("specificDate").addEventListener("change", renderHistory);

// RENDER HISTORY
function renderHistory() {
    list.innerHTML = "";

    let filtered = [...historyData];

    const type = document.getElementById("typeFilter").value;
    const dateFilter = document.getElementById("dateFilter").value;
    const specificDate = document.getElementById("specificDate").value;

    if (type !== "all") {
        filtered = filtered.filter(h => h.type === type);
    }

    if (specificDate) {
        filtered = filtered.filter(h => h.date === specificDate);
    }

    if (filtered.length === 0) {
        list.innerHTML = `<p style="text-align:center; opacity:0.6;">No history found</p>`;
        return;
    }

    filtered.forEach(h => {
        const card = document.createElement("div");
        card.className = "history-item";

        card.innerHTML = `
            <div><strong>${h.type.toUpperCase()}</strong></div>
            <div>${h.items[0].name}</div>
            <div>Qty: ${h.items[0].qty}</div>
            <div>${h.worker.name} (${h.worker.role})</div>
            <div>${h.shop}</div>
            <div>₹${h.sellingPrice}</div>
            <div>Profit: ₹${h.profit}</div>
            <div>${h.date} ${h.time}</div>
        `;

        card.onclick = () => openPopup(h);
        list.appendChild(card);
    });
}

// POPUP
function openPopup(h) {
    popup.style.display = "flex";

    popupDetails.innerHTML = `
        <h3>Transaction Details</h3>
        <p><strong>Shop:</strong> ${h.shop}</p>
        <p><strong>Worker:</strong> ${h.worker.name} (${h.worker.role})</p>
        <p><strong>Customer:</strong> ${h.customer.name} (${h.customer.phone})</p>
        <p><strong>Visits:</strong> ${h.customer.visitCount}</p>

        <h4>Items</h4>
        ${h.items.map(i => `<p>${i.name} × ${i.qty} = ₹${i.price * i.qty}</p>`).join("")}

        <p><strong>Total:</strong> ₹${h.sellingPrice}</p>
        <p><strong>Profit:</strong> ₹${h.profit}</p>
        <p><strong>Date:</strong> ${h.date} ${h.time}</p>
    `;
}

function closePopup() {
    popup.style.display = "none";
}

// INIT
renderHistory();

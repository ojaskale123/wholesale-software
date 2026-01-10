// ================================
// HISTORY WITH CLICK DETAILS
// ================================

let allHistory = [];

function loadHistory() {
  allHistory = getData(STORAGE_KEYS.HISTORY);
  renderHistory(allHistory);
}

function renderHistory(history) {
  const container = document.getElementById("historyList");
  container.innerHTML = "";

  if (!history.length) {
    container.innerHTML = "<p>No history found.</p>";
    return;
  }

  history.slice().reverse().forEach(h => {
    const div = document.createElement("div");
    div.className = "history-card";

    div.onclick = () => showDetails(h);

    if (h.type === "sale") {
      div.innerHTML = `
        <strong>${h.customerName}</strong> (${h.customerNumber})<br>
        ${h.itemName} × ${h.quantity}<br>
        ₹${h.totalAmount} <br>
        <small>${h.date}</small>
      `;
    } else {
      div.innerHTML = `
        <strong>${h.title}</strong><br>
        <small>${h.date}</small>
      `;
    }

    container.appendChild(div);
  });
}

// ================================
// FILTERS
// ================================

function applyFilters() {
  const customer = document.getElementById("customerFilter").value.toLowerCase();
  const date = document.getElementById("dateFilter").value;

  const filtered = allHistory.filter(h => {
    let okCustomer = true;
    let okDate = true;

    if (customer && h.customerName) {
      okCustomer = h.customerName.toLowerCase().includes(customer);
    }

    if (date) {
      okDate = h.date === date;
    }

    return okCustomer && okDate;
  });

  renderHistory(filtered);
}

function resetFilters() {
  document.getElementById("customerFilter").value = "";
  document.getElementById("dateFilter").value = "";
  renderHistory(allHistory);
}

// ================================
// MODAL LOGIC
// ================================

function showDetails(h) {
  const modal = document.getElementById("detailModal");
  const body = document.getElementById("modalBody");

  body.innerHTML = `
    <h3>Sale Details</h3>
    <p><b>Customer:</b> ${h.customerName}</p>
    <p><b>Number:</b> ${h.customerNumber}</p>
    <p><b>Item:</b> ${h.itemName}</p>
    <p><b>Quantity:</b> ${h.quantity}</p>
    <p><b>Total:</b> ₹${h.totalAmount}</p>
    <p><b>Date:</b> ${h.date}</p>
  `;

  modal.style.display = "flex";
}

function closeModal() {
  document.getElementById("detailModal").style.display = "none";
}

loadHistory();

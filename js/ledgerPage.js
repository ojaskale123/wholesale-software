let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    window.location = "login.html"; // redirect if not logged in
}
// ================================
// LEDGER PAGE LOGIC
// ================================

const customerSelect = document.getElementById("customerSelect");
const ledgerTable = document.getElementById("ledgerTable");
const balanceEl = document.getElementById("balance");

// Load customers in dropdown
function loadCustomers() {
  const customers = getAllCustomers();
  customerSelect.innerHTML = "";

  customers.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = `${c.name} (${c.phone})`;
    customerSelect.appendChild(opt);
  });
}

// Render ledger
function renderLedger() {
  const customerId = customerSelect.value;
  const entries = getCustomerLedger(customerId);
  ledgerTable.innerHTML = "";

  entries.forEach(e => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${e.date}</td>
      <td>${e.type}</td>
      <td>${e.amount}</td>
      <td>${e.note}</td>
    `;
    ledgerTable.appendChild(row);
  });

  balanceEl.textContent =
    "Balance: ₹" + calculateBalance(customerId);
}

// Add ledger entry
ledgerForm.addEventListener("submit", e => {
  e.preventDefault();

  addLedgerEntry({
    customerId: customerSelect.value,
    amount: amount.value,
    type: type.value,
    note: note.value
  });

  ledgerForm.reset();
  renderLedger();
});

customerSelect.addEventListener("change", renderLedger);

// Initial load
loadCustomers();
renderLedger();

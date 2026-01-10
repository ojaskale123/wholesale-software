// ================================
// CUSTOMER PAGE LOGIC
// ================================

const customerForm = document.getElementById("customerForm");
const customerTable = document.getElementById("customerTable");

function renderCustomers() {
  const customers = getAllCustomers();
  customerTable.innerHTML = "";

  customers.forEach(c => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.type}</td>
    `;
    customerTable.appendChild(row);
  });
}

customerForm.addEventListener("submit", e => {
  e.preventDefault();

  const success = addCustomer({
    name: custName.value,
    phone: custPhone.value,
    type: custType.value,
    address: custAddress.value
  });

  if (success) {
    customerForm.reset();
    renderCustomers();
  }
});

renderCustomers();

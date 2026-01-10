let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    window.location = "login.html"; // redirect if not logged in
}
// ================================
// STOCK PAGE LOGIC
// ================================

const form = document.getElementById("addStockForm");
const table = document.getElementById("stockTable");

// Render stock table
function renderStock() {
  const stock = getAllStock();
  table.innerHTML = "";

  stock.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>${item.quantity}</td>
      <td>${item.barcode || "-"}</td>
    `;
    table.appendChild(row);
  });
}

// Handle add stock
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const stockData = {
    name: document.getElementById("name").value,
    category: document.getElementById("category").value,
    quantity: document.getElementById("quantity").value,
    costPrice: document.getElementById("costPrice").value,
    retailPrice: document.getElementById("retailPrice").value,
    wholesalePrice: document.getElementById("wholesalePrice").value,
    barcode: document.getElementById("barcode").value.trim()
  };

  addStock(stockData);
  form.reset();
  renderStock();
});

// Initial load
renderStock();

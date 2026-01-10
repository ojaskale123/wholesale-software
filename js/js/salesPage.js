const saleCustomer = document.getElementById("saleCustomer");
const saleItem = document.getElementById("saleItem");
const saleQty = document.getElementById("saleQty");
const saleTotal = document.getElementById("saleTotal");

// Load customers
function loadCustomers() {
  getAllCustomers().forEach(c => {
    const opt = document.createElement("option");
    opt.value = c.id;
    opt.textContent = c.name;
    saleCustomer.appendChild(opt);
  });
}

// Load stock
function loadStock() {
  getAllStock().forEach(s => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = `${s.name} (Qty: ${s.quantity})`;
    saleItem.appendChild(opt);
  });
}

// Calculate total
saleQty.addEventListener("input", () => {
  const item = getAllStock().find(s => s.id === saleItem.value);
  const customer = getAllCustomers().find(c => c.id === saleCustomer.value);
  if (!item || !customer) return;

  const price =
    customer.type === "wholesale"
      ? item.wholesalePrice
      : item.retailPrice;

  saleTotal.textContent =
    "Total: ₹" + price * Number(saleQty.value || 0);
});

// Make sale
salesForm.addEventListener("submit", e => {
  e.preventDefault();

  const item = getAllStock().find(s => s.id === saleItem.value);
  const customer = getAllCustomers().find(c => c.id === saleCustomer.value);

  const price =
    customer.type === "wholesale"
      ? item.wholesalePrice
      : item.retailPrice;

  const qty = Number(saleQty.value);
  const total = price * qty;

  const success = makeSale({
    customerId: customer.id,
    stockId: item.id,
    quantity: qty,
    price,
    total
  });

  if (success) {
    alert("Sale successful");
    location.reload();
  }
});

// Init
loadCustomers();
loadStock();

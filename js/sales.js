let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    window.location = "login.html"; // redirect if not logged in
}
// ================================
// SALES LOGIC
// ================================

function createSale({
  customerId,
  stockId,
  quantity,
  price,
  total
}) {
  return {
    id: generateId("sale"),
    customerId,
    stockId,
    quantity: Number(quantity),
    price: Number(price),
    total: Number(total),
    date: today()
  };
}

function makeSale(saleData) {
  const stock = getData(STORAGE_KEYS.STOCK);
  const item = stock.find(s => s.id === saleData.stockId);

  if (!item || item.quantity < saleData.quantity) {
    alert("Not enough stock");
    return false;
  }

  // Deduct stock
  item.quantity -= saleData.quantity;
  item.updatedAt = new Date().toISOString();
  saveData(STORAGE_KEYS.STOCK, stock);

  // Save sale
  const sales = getData(STORAGE_KEYS.SALES);
  sales.push(createSale(saleData));
  saveData(STORAGE_KEYS.SALES, sales);

  // Add ledger debit
  addLedgerEntry({
    customerId: saleData.customerId,
    amount: saleData.total,
    type: "debit",
    note: "Sale"
  });

  // ================================
  // HISTORY ENTRY (FULL SALE DETAILS)
  // ================================
  const customer = getAllCustomers().find(
    c => c.id === saleData.customerId
  );

  addHistory({
    id: generateId("history"),
    type: "sale",
    refId: saleData.stockId,

    customerId: saleData.customerId,
    customerName: customer ? customer.name : "Unknown",
    customerNumber: customer ? customer.phone : "N/A",

    itemName: item.name,
    quantity: saleData.quantity,
    totalAmount: saleData.total,

    title: "Sale made",
    date: today()
  });

  return true;
}

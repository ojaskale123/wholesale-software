let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    window.location = "login.html"; // redirect if not logged in
}
// ================================
// STOCK DATA MODEL
// ================================

function createStockItem({
  name,
  category,
  quantity,
  costPrice,
  retailPrice,
  wholesalePrice,
  barcode = ""
}) {
  return {
    id: generateId("stock"),   // UNIQUE INTERNAL ID
    name,
    category,
    quantity: Number(quantity),
    costPrice: Number(costPrice),
    retailPrice: Number(retailPrice),
    wholesalePrice: Number(wholesalePrice),
    barcode,                  // NOT UNIQUE (important)
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// ================================
// ADD STOCK (REFILL SAFE)
// ================================
function addStock(stockData) {
  const stock = getData(STORAGE_KEYS.STOCK);

  // If barcode exists, increase quantity
  if (stockData.barcode) {
    const existing = stock.find(
      item => item.barcode === stockData.barcode
    );

    if (existing) {
      existing.quantity += Number(stockData.quantity);
      existing.updatedAt = new Date().toISOString();
      saveData(STORAGE_KEYS.STOCK, stock);
      return;
    }
  }

  // Else add new stock item
  const newItem = createStockItem(stockData);
  stock.push(newItem);
  saveData(STORAGE_KEYS.STOCK, stock);
}

// ================================
// GET ALL STOCK
// ================================
function getAllStock() {
  return getData(STORAGE_KEYS.STOCK);
}
document.addEventListener("DOMContentLoaded", function() {
    // Make sure currentUser exists
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Redirect if not logged in
    if(!currentUser){
        window.location = "login.html";
    }

    // Hide owner-only elements for workers
    if(currentUser.role === "worker"){
        document.querySelectorAll(".owner-only").forEach(el => el.style.display = "none");
    }
});

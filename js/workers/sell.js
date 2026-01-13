const stockList = document.getElementById("stockList");
const searchItem = document.getElementById("searchItem");
const barcodeInput = document.getElementById("barcodeInput");

const sellPanel = document.getElementById("sellPanel");
const selectedProduct = document.getElementById("selectedProduct");
const availableQty = document.getElementById("availableQty");
const sellQty = document.getElementById("sellQty");
const sellPrice = document.getElementById("sellPrice");
const itemPlace = document.getElementById("itemPlace");

let products = JSON.parse(localStorage.getItem("products")) || [];
let selectedIndex = null;

/* LOAD STOCK */
function renderStock(list) {
    stockList.innerHTML = "";

    list.forEach((item, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <div class="item-info">
                <strong>${item.name}</strong>
                <small>Qty: ${item.qty} | ₹${item.sellingPrice}</small>
            </div>
        `;

        li.onclick = () => openSellPanel(index);
        stockList.appendChild(li);
    });
}

renderStock(products);

/* SEARCH */
searchItem.addEventListener("keyup", () => {
    const value = searchItem.value.toLowerCase();
    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(value)
    );
    renderStock(filtered);
});

/* BARCODE */
barcodeInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const foundIndex = products.findIndex(
            p => p.id === barcodeInput.value
        );
        if (foundIndex !== -1) openSellPanel(foundIndex);
        barcodeInput.value = "";
    }
});

/* OPEN PANEL */
function openSellPanel(index) {
    const product = products[index];
    selectedIndex = index;

    selectedProduct.innerText = product.name;
    availableQty.value = product.qty;
    sellPrice.value = product.sellingPrice;
    sellQty.value = 1;
    itemPlace.value = product.location || "";

    sellPanel.style.display = "block";
}

/* CLOSE PANEL */
function closePanel() {
    sellPanel.style.display = "none";
}

/* CONFIRM SELL */
document.getElementById("confirmSell").addEventListener("click", () => {
    const qty = Number(sellQty.value);

    if (qty <= 0 || qty > products[selectedIndex].qty) {
        alert("Invalid quantity");
        return;
    }

    products[selectedIndex].qty -= qty;
    localStorage.setItem("products", JSON.stringify(products));

    let history = JSON.parse(localStorage.getItem("salesHistory")) || [];
    history.push({
        product: products[selectedIndex].name,
        qty,
        price: sellPrice.value,
        place: itemPlace.value,
        date: new Date().toLocaleString()
    });
    localStorage.setItem("salesHistory", JSON.stringify(history));

    alert("Sale completed");
    closePanel();
    renderStock(products);
});

// ROLE CHECK
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user || user.role !== "owner") {
    alert("Access denied");
    location.href = "index.html";
}

// SAVE PRODUCT BUTTON
document.getElementById("saveProductBtn").addEventListener("click", () => {

    // Get values
    const productType = document.getElementById("productType").value;
    const productName = document.getElementById("productName").value.trim();
    const qty = Number(document.getElementById("qty").value);
    const productId = document.getElementById("productId").value.trim();
    const description = document.getElementById("description").value.trim();
    const purchasePrice = Number(document.getElementById("purchasePrice").value);
    const sellingPrice = Number(document.getElementById("sellingPrice").value);
    const location = document.getElementById("location").value.trim();
    const imageInput = document.getElementById("productImage");
    const imageFile = imageInput.files[0] ? imageInput.files[0].name : "";

    // Validation
    if (!productType || !productName || !qty || !productId) {
        alert("Please fill all required fields!");
        return;
    }

    // Get existing stock
    let stock = JSON.parse(localStorage.getItem("stock")) || [];

    // Add new product
    stock.push({
        type: productType,
        name: productName,
        qty: qty,
        id: productId,
        description: description,
        purchasePrice: purchasePrice,
        sellingPrice: sellingPrice,
        location: location,
        image: imageFile
    });

    // Save back to localStorage
    localStorage.setItem("stock", JSON.stringify(stock));

    alert("Product added successfully!");
    location.href = "stock.html"; // Go back to stock page
});

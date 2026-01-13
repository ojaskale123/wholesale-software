document.getElementById("saveProductBtn").addEventListener("click", () => {
    const product = {
        type: productType.value,
        name: productName.value,
        qty: qty.value,
        id: productId.value,
        description: description.value,
        purchasePrice: purchasePrice.value,
        sellingPrice: sellingPrice.value,
        location: location.value,
        addedBy: "worker",
        date: new Date().toLocaleString()
    };

    if (!product.name || !product.type) {
        alert("Please fill required fields");
        return;
    }

    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product added successfully");
    window.location.href = "stock.html";
});

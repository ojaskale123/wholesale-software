console.log("Customers page loaded");

// LOAD CUSTOMERS
let customers = JSON.parse(localStorage.getItem("customers")) || [];

// DOM
const list = document.getElementById("customersList");
const totalEl = document.getElementById("totalCustomers");
const retailerEl = document.getElementById("retailerCount");
const regularEl = document.getElementById("regularCount");

// UPDATE COUNTS
function updateCounts() {
    totalEl.textContent = customers.length;

    const retailers = customers.filter(c => c.type === "Retailer").length;
    const regulars = customers.filter(c => c.type === "Customer").length;

    retailerEl.textContent = retailers;
    regularEl.textContent = regulars;
}

// RENDER CUSTOMERS
function renderCustomers() {
    list.innerHTML = "";

    if (customers.length === 0) {
        list.innerHTML = `
            <p style="text-align:center; opacity:0.6;">
                No customers added yet
            </p>`;
        return;
    }

    customers.forEach(c => {
        const div = document.createElement("div");
        div.className = "customer-item";

        div.innerHTML = `
            <div class="customer-details">
                <div>
                    <strong>Name</strong>
                    <span>${c.name}</span>
                </div>
                <div>
                    <strong>Type</strong>
                    <span>${c.type}</span>
                </div>
                <div>
                    <strong>Contact</strong>
                    <span>${c.contact}</span>
                </div>
                <div>
                    <strong>Joined</strong>
                    <span>${c.joined}</span>
                </div>
            </div>
        `;

        list.appendChild(div);
    });
}

// INIT
updateCounts();
renderCustomers();

// ================================
// CUSTOMER DATA MODEL
// ================================

function createCustomer({
  name,
  phone,
  type = "retail", // retail | wholesale
  address = ""
}) {
  return {
    id: generateId("cust"),
    name,
    phone,
    type,
    address,
    createdAt: new Date().toISOString()
  };
}

// ================================
// ADD CUSTOMER
// ================================
function addCustomer(customerData) {
  const customers = getData(STORAGE_KEYS.CUSTOMERS);

  // prevent duplicate phone
  const exists = customers.find(c => c.phone === customerData.phone);
  if (exists) {
    alert("Customer with this phone already exists");
    return false;
  }

  customers.push(createCustomer(customerData));
  saveData(STORAGE_KEYS.CUSTOMERS, customers);
  return true;
}

// ================================
// GET ALL CUSTOMERS
// ================================
function getAllCustomers() {
  return getData(STORAGE_KEYS.CUSTOMERS);
}

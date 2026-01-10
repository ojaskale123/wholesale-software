// ================================
// LEDGER DATA MODEL
// ================================

function createLedgerEntry({
  customerId,
  amount,
  type, // debit | credit
  note = ""
}) {
  return {
    id: generateId("ledger"),
    customerId,
    amount: Number(amount),
    type,
    note,
    date: today()
  };
}

// ================================
// ADD LEDGER ENTRY
// ================================
function addLedgerEntry(entryData) {
  const ledger = getData(STORAGE_KEYS.LEDGER);
  ledger.push(createLedgerEntry(entryData));
  saveData(STORAGE_KEYS.LEDGER, ledger);
}

// ================================
// GET CUSTOMER LEDGER
// ================================
function getCustomerLedger(customerId) {
  return getData(STORAGE_KEYS.LEDGER)
    .filter(l => l.customerId === customerId);
}

// ================================
// CALCULATE BALANCE
// ================================
function calculateBalance(customerId) {
  const entries = getCustomerLedger(customerId);
  let balance = 0;

  entries.forEach(e => {
    if (e.type === "debit") balance += e.amount;
    else balance -= e.amount;
  });

  return balance;
}

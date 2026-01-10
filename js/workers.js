// ================================
// WORKER DATA MODEL
// ================================

function createWorker({
  name,
  role = "helper", // helper | technician | sales
  phone = ""
}) {
  return {
    id: generateId("worker"),
    name,
    role,
    phone,
    createdAt: today()
  };
}

// ================================
// ADD WORKER
// ================================
function addWorker(workerData) {
  const workers = getData(STORAGE_KEYS.WORKERS);
  workers.push(createWorker(workerData));
  saveData(STORAGE_KEYS.WORKERS, workers);
}

// ================================
// GET ALL WORKERS
// ================================
function getAllWorkers() {
  return getData(STORAGE_KEYS.WORKERS);
}

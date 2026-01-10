let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
    window.location = "login.html"; // redirect if not logged in
}
// ================================
// REPAIR / JOB MODEL
// ================================

function createRepairJob({
  customerId,
  device,
  issue,
  workerId = "",
  charge = 0
}) {
  return {
    id: generateId("job"),
    customerId,
    device,
    issue,
    workerId,
    charge: Number(charge),
    status: "received",
    createdAt: today(),
    updatedAt: today()
  };
}

// ================================
// ADD JOB
// ================================
function addRepairJob(jobData) {
  const jobs = getData(STORAGE_KEYS.REPAIRS);
  jobs.push(createRepairJob(jobData));
  saveData(STORAGE_KEYS.REPAIRS, jobs);
}

// ================================
// UPDATE JOB STATUS
// ================================
function updateJobStatus(jobId, status) {
  const jobs = getData(STORAGE_KEYS.REPAIRS);
  const job = jobs.find(j => j.id === jobId);
  if (!job) return;

  job.status = status;
  job.updatedAt = today();

  // When completed → add ledger debit
  if (status === "completed" && job.charge > 0) {
    addLedgerEntry({
      customerId: job.customerId,
      amount: job.charge,
      type: "debit",
      note: "Repair charge"
    });
  }

  saveData(STORAGE_KEYS.REPAIRS, jobs);
}

// ================================
// GET ALL JOBS
// ================================
function getAllJobs() {
  return getData(STORAGE_KEYS.REPAIRS);
}
// ================================
// ASSIGN WORKER TO JOB
// ================================
function assignWorkerToJob(jobId, workerId) {
  const jobs = getData(STORAGE_KEYS.REPAIRS);
  const job = jobs.find(j => j.id === jobId);
  if (!job) return;

  job.workerId = workerId;
  job.updatedAt = today();
  saveData(STORAGE_KEYS.REPAIRS, jobs);
}

// ================================
// UPDATE JOB STATUS (SAFE)
// ================================
function changeJobStatus(jobId, status) {
  updateJobStatus(jobId, status);
}

const repairCustomer = document.getElementById("repairCustomer");
const jobTable = document.getElementById("jobTable");

// Load customers
getAllCustomers().forEach(c => {
  const opt = document.createElement("option");
  opt.value = c.id;
  opt.textContent = c.name;
  repairCustomer.appendChild(opt);
});

// Create job
repairForm.addEventListener("submit", e => {
  e.preventDefault();

  addRepairJob({
    customerId: repairCustomer.value,
    device: device.value,
    issue: issue.value,
    charge: charge.value
  });

  repairForm.reset();
  renderJobs();
});

function renderJobs() {
  jobTable.innerHTML = "";

  const workers = getAllWorkers();
  const jobs = getAllJobs();

  jobs.forEach(j => {
    const row = document.createElement("tr");

    const workerOptions = workers
      .map(
        w =>
          `<option value="${w.id}" ${
            j.workerId === w.id ? "selected" : ""
          }>${w.name}</option>`
      )
      .join("");

    row.innerHTML = `
      <td>${j.device}</td>
      <td>${j.issue}</td>
      <td>
        <select onchange="assignWorkerToJob('${j.id}', this.value)">
          <option value="">Unassigned</option>
          ${workerOptions}
        </select>
      </td>
      <td>
        <select onchange="changeJobStatus('${j.id}', this.value)">
          <option value="received" ${j.status==="received"?"selected":""}>Received</option>
          <option value="in_progress" ${j.status==="in_progress"?"selected":""}>In Progress</option>
          <option value="waiting_parts" ${j.status==="waiting_parts"?"selected":""}>Waiting Parts</option>
          <option value="completed" ${j.status==="completed"?"selected":""}>Completed</option>
          <option value="delivered" ${j.status==="delivered"?"selected":""}>Delivered</option>
        </select>
      </td>
    `;

    jobTable.appendChild(row);
  });
}

renderJobs();

const workerTable = document.getElementById("workerTable");

// Add worker
workerForm.addEventListener("submit", e => {
  e.preventDefault();

  addWorker({
    name: workerName.value,
    role: workerRole.value,
    phone: workerPhone.value
  });

  workerForm.reset();
  renderWorkers();
});

// Render workers
function renderWorkers() {
  workerTable.innerHTML = "";
  getAllWorkers().forEach(w => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${w.name}</td>
      <td>${w.role}</td>
      <td>${w.phone || "-"}</td>
    `;
    workerTable.appendChild(row);
  });
}

renderWorkers();

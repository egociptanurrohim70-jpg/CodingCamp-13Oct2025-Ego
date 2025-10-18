/// Database Simulation
let tasksDb = [];

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, function(m) { return map[m]; });
}

function validateInput(task, date) {
  if (!task || !task.trim() || !date || !date.trim()) {
    alert('Please enter both task and due date.');
    return false;
  }
  return true;
}

/// Add Functionality
function addTask() {
  const taskInput = document.getElementById('Input-Text');
  const taskDate = document.getElementById('Input-Date');

  if (!validateInput(taskInput.value, taskDate.value)) return;

  const newTask = {
    task: taskInput.value.trim(),
    date: taskDate.value,
  };

  tasksDb.push(newTask);

  // clear inputs
  taskInput.value = '';
  taskDate.value = '';

  renderTasks();
}

/// Render Functionality (renders proper table rows)
function renderTasks() {
  const tbody = document.querySelector('#Main-table tbody');
  if (!tbody) return;

  if (tasksDb.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td id="No-Task" colspan="4">No task found</td>
      </tr>
    `;
    return;
  }

  // build rows
  let html = '';
  tasksDb.forEach((taskObj, index) => {
    html += `
      <tr data-index="${index}">
        <td>${escapeHtml(taskObj.task)}</td>
        <td>${escapeHtml(taskObj.date)}</td>
        <td><!-- status placeholder --></td>
        <td><button class="delete-task" data-index="${index}">Delete</button></td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

/// Delete All Functionality
function Deletebutton() {
  tasksDb = [];
  renderTasks();
}

/// Delete single task
function deleteTaskAt(index) {
  if (index >= 0 && index < tasksDb.length) {
    tasksDb.splice(index, 1);
    renderTasks();
  }
}

/// Attach listeners and delegation
document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('Add-button');
  const deleteAllBtn = document.getElementById('Delete-button');
  const tbody = document.querySelector('#Main-table tbody');

  if (addBtn) addBtn.addEventListener('click', addTask);
  if (deleteAllBtn) deleteAllBtn.addEventListener('click', () => {
    // confirm then delete all
    if (confirm('Delete all tasks?')) Deletebutton();
  });

  if (tbody) {
    tbody.addEventListener('click', (e) => {
      const del = e.target.closest('.delete-task');
      if (del) {
        const idx = Number(del.getAttribute('data-index'));
        deleteTaskAt(idx);
      }
    });
  }
});
/// Database Simulation
let tasksDb = [];

/// Add Functionality
function addTask() {
    /// Get Input Values
    const taskInput = document.getElementById('Input-Text');
    const taskDate = document.getElementById('Input-Date');

    /// Validate Input
    if (validateInput(taskInput.value, taskDate.value)) {
        /// Create Task Object
        const newTask = {
            task: taskInput.value,
            date: taskDate.value,
        }

        /// Add to database
        tasksDb.push(newTask);

        /// Render
        renderTasks();
    }
}

/// Render Functionality
function renderTasks() {
    /// Clear Existing List
    const taskList = document.getElementById('No-Task');
    taskList.innerHTML = '';

    /// Render Each Task
    tasksDb.forEach((taskObj, index) => {
        taskList.innerHTML += `<li>${taskObj.task}</li>`;
    });
}

/// Delete All Functionality
function Deletebutton() {
    /// Clear Database
    tasksDb = [];

    /// Render
    renderTasks();
}

/// Filter Functionality (Placeholder)
function filterTasks() { }

/// Input Validation
function validateInput(task, date) {
    /// Simple Validation
    if (task.trim() === '' || date.trim() === '') {
        alert('Please enter both task and due date.');
        return false;
    }
    return true;
}
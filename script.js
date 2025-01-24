// Load tasks from Local Storage and display them
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // Avoid saving again when loading tasks
}

function addTask(taskText, save = true) {
    if (!taskText.trim()) {
        alert('Please enter a task!');
        return;
    }

    // Create task element
    const taskItem = document.createElement('li');
    taskItem.textContent = taskText;

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.onclick = function () {
        taskItem.remove(); // Remove from DOM
        removeTask(taskText); // Remove from Local Storage
    };

    // Append button and task to list
    taskItem.appendChild(removeButton);
    document.getElementById('task-list').appendChild(taskItem);

    // Save task to Local Storage if `save` is true
    if (save) {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const updatedTasks = tasks.filter(task => task !== taskText); // Remove the specific task
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Update Local Storage
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load tasks when the page loads

    document.getElementById('add-task-btn').addEventListener('click', () => {
        const taskInput = document.getElementById('task-input');
        addTask(taskInput.value); // Default `save` is true
        taskInput.value = ''; // Clear input
    });

    document.getElementById('task-input').addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskInput = document.getElementById('task-input');
            addTask(taskInput.value); // Default `save` is true
            taskInput.value = ''; // Clear input
        }
    });
});

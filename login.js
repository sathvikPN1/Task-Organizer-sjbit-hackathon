// Check for existing tasks in local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to add a new task
function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const category = document.getElementById('category').value;

    const newTask = {
        title,
        description,
        dueDate,
        category,
        completed: false
    };

    tasks.push(newTask);

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    displayTasks();
}

// Function to display tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Category: ${task.category}</p>
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${index})">
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskElement);
    });
}

// Function to toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Function to edit a task
function editTask(index) {
    const updatedTitle = prompt('Enter new title:', tasks[index].title);
    const updatedDescription = prompt('Enter new description:', tasks[index].description);
    const updatedDueDate = prompt('Enter new due date:', tasks[index].dueDate);
    const updatedCategory = prompt('Enter new category:', tasks[index].category);

    tasks[index].title = updatedTitle || tasks[index].title;
    tasks[index].description = updatedDescription || tasks[index].description;
    tasks[index].dueDate = updatedDueDate || tasks[index].dueDate;
    tasks[index].category = updatedCategory || tasks[index].category;

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Function to filter tasks by category
function filterTasksByCategory() {
    const categoryFilter = document.getElementById('categoryFilter').value;

    if (categoryFilter === 'all') {
        displayTasks();
    } else {
        const filteredTasks = tasks.filter(task => task.category === categoryFilter);
        displayFilteredTasks(filteredTasks);
    }
}

// Function to filter tasks by completion status
function filterTasksByStatus() {
    const statusFilter = document.getElementById('statusFilter').value;

    if (statusFilter === 'all') {
        displayTasks();
    } else {
        const filteredTasks = tasks.filter(task => {
            if (statusFilter === 'completed') {
                return task.completed;
            } else {
                return !task.completed;
            }
        });
        displayFilteredTasks(filteredTasks);
    }
}

// Function to display filtered tasks
function displayFilteredTasks(filteredTasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    filteredTasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task');
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Category: ${task.category}</p>
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${index})">
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskElement);
    });
}

// Display existing tasks on page load
displayTasks();

// ... (existing code)

// Function to add a new task
function addTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const dueTime = document.getElementById('dueTime').value; // New line
    const category = document.getElementById('category').value;

    const newTask = {
        title,
        description,
        dueDate,
        dueTime, // New line
        category,
        completed: false
    };

    tasks.push(newTask);

    // Save tasks to local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Set a reminder if dueTime is provided
    if (dueTime) {
        setReminder(newTask);
    }

    displayTasks();
}

// Function to set a reminder
function setReminder(task) {
    const reminderTime = new Date(`${task.dueDate} ${task.dueTime}`).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = reminderTime - currentTime;

    if (timeDifference > 0) {
        setTimeout(() => {
            showReminder(task.title);
        }, timeDifference);
    }
}

// Function to display a reminder
function showReminder(taskTitle) {
    const reminderSlot = document.getElementById('reminderSlot');
    const reminderElement = document.createElement('div');
    reminderElement.classList.add('reminder');
    reminderElement.innerHTML = `
        <p>Reminder: "${taskTitle}" is due now!</p>
    `;
    reminderSlot.appendChild(reminderElement);
}

// ... (existing code)

let greenIcon = document.getElementById('green');
let blackIcon = document.getElementById('black');
let chocolateIcon = document.getElementById('chocolate');
let body = document.querySelector("body");
let input = document.querySelectorAll("input");
let buttons = document.querySelectorAll("button");


greenIcon.addEventListener("click", greenColor);
blackIcon.addEventListener("click", blackColor);
chocolateIcon.addEventListener("click", chocolateColor);


function greenColor() {
    body.style.background = "forestgreen";
    // remove chocolate
    input.forEach(x => {
        x.classList.remove("chocolateInput");
    });
    buttons.forEach(x => {
        x.classList.remove("chocolateBtn");
    });
    // remove black
    input.forEach(x => {
        x.classList.remove("blackInput");
    });
    buttons.forEach(x => {
        x.classList.remove("blackBtn");
    });

}

function blackColor() {
    body.style.background = "black";
    input.forEach(x => {
        x.classList.add("blackInput");
    });
    buttons.forEach(x => {
        x.classList.add("blackBtn");
    });

    // remove chocolate
    input.forEach(x => {
        x.classList.remove("chocolateInput");
    });
    buttons.forEach(x => {
        x.classList.remove("chocolateBtn");
    });

}


function chocolateColor() {
    body.style.background = "chocolate";
    buttons.forEach(x => {
        x.classList.add("chocolateBtn");
    });
    input.forEach(x => {
        x.classList.add("chocolateInput");
    });

    // remove classes
    input.forEach(x => {
        x.classList.remove("blackInput");
    });
    buttons.forEach(x => {
        x.classList.remove("blackBtn");
    });
}


// Define UI Element
let taskSubmitBtn = document.getElementById("taskSubmitBtn");

let taskInput = document.getElementById("taskInput");
let tasklist = document.getElementById("tasklist");
let taskClearBtn = document.getElementById("taskClearBtn");
let taskFilter = document.getElementById("taskFilter");


// Define EvenListener
taskSubmitBtn.addEventListener("click", addTask);
tasklist.addEventListener("click", removeTask);
taskClearBtn.addEventListener("click", clearTasks);
taskFilter.addEventListener("keyup", filterTask);
document.addEventListener('DOMContentLoaded', getTasks);


// Define function
// Add Task
function addTask(e) {
    e.preventDefault();

    if (taskInput.value == "") {
        alert("Please add task")
    } else {
        let li = document.createElement("li");
        let output = taskInput.value;

        tasklist.appendChild(li);
        li.innerText = `${output} `;
        let link = document.createElement("a");
        link.setAttribute("href", "#");

        link.innerText = "Delete";
        li.appendChild(link);

        storeTaskInLocalStorage(taskInput.value);
        taskInput.value = '';
    }
}

// Remove Task
function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure!")) {
            let ele = e.target.parentElement;
            ele.remove();
            removeFromLS(ele);
        }
    }
}

// Clear Tasks
function clearTasks(e) {
    tasklist.innerText = "";
    localStorage.clear();
}

// Filter Task
function filterTask(e) {
    let text = e.target.value.toLowerCase();

    var allLi = document.querySelectorAll("li");
    allLi.forEach(task => {
        let item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
        } else {
            task.style.display = "none";
        }
    });

}

// Store in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }


    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function getTasks() {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    console.log(tasks);
    tasks.forEach(item => {
        tasklist.innerHTML += `<li>${item} <a href="#">Delete</a></li>`;
    });
}

function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = taskItem;

    li.removeChild(li.lastChild);   //<a>x</a>

    tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}
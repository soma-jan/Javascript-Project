const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks ');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
document.addEventListener('DOMContentLoaded', getfromLocalstorage);

form.addEventListener('submit', addTask);

function addTask(e) {
  if (taskInput.value === '') {
    alert('Please enter a task');
  } else {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
    storeInLocalstorage(taskInput.value);
    taskInput.value = '';
    e.preventDefault();
  }
}
function storeInLocalstorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function getfromLocalstorage() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i i class="fa fa-remove"></i>';
    li.appendChild(link);

    taskList.appendChild(li);
  });
}
function deletefromLocalstorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (val, index) {
    if (val === task) {
      console.log(val);
      console.log(task);
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function clearfromLocalstorage() {
  localStorage.clear();
}

taskList.addEventListener('click', deletetask);
function deletetask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    e.target.parentElement.parentElement.remove();
    //deletefromLocalstorage(e.target.parentElement.parentElement.textContent);
    deletefromLocalstorage(e.target.parentElement.parentElement.textContent);
  }
}

clearBtn.addEventListener('click', clearAll);
function clearAll(e) {
  //const taskList = document.querySelector('.collection');
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  clearfromLocalstorage();
  filter.value = '';
}
filter.addEventListener('keyup', search);
function search(e) {
  const text = e.target.value.toLowerCase();
  const lists = document.querySelectorAll('.collection-item');
  lists.forEach(function (li) {
    if (li.textContent.toLowerCase().indexOf(text) != -1) {
      li.style.display = 'block';
    } else {
      li.style.display = 'none';
    }
  });
}

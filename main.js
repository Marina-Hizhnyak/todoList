
import "/style.scss";
import { nav } from "./components/nav.js"

import * as bootstrap from "bootstrap";

const app = document.getElementById("app");


const renderTaskList = (list) => {
  let html = `<ul class="container"></ul> `
}

app.innerHTML = `
    ${nav}
    <div class="container">
        <div class="modal-header p-3">
        <h5 class="modal-title">Todo list</h5>
      </div>
<div class="mb-5">
  <label for="exampleFormControlInput1" class="form-label">Tache</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="un truc a faire">
</div>
<button type="button" class="btn btn-primary">Ajouter</button>
</div>
<ul class="list-group m-5">
</ul>
  `;

const addMessage = document.querySelector('.form-control');
const addButton = document.querySelector('.btn');
const todo = document.querySelector('.list-group');

let todoList = [];

if (localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
}

addButton.addEventListener('click', function () {
  if (!addMessage.value) return;
  let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false
  }
  todoList.push(newTodo);
  displayMessages();
  localStorage.setItem('todo', JSON.stringify(todoList));
  addMessage.value = '';
});

function displayMessages() {
  let displayMessage = '';

  if (todoList.length === 0) todo.innerHTML = '';
  todoList.forEach(function (item, i) {
    displayMessage +=
      `
  <li class="list-group-item">
    <input class="form-check-input me-1" type="checkbox" id='item_${i}' value="" aria-label="..." ${item.checked ? 'checked' : ''}>
   <label class="${item.important ? 'important' : ''}" for='item_${i}'>${item.todo}</label>
  </li>
    `;
    todo.innerHTML = displayMessage;
  })
};


todo.addEventListener('change', function (event) {
  let idInput = event.target.getAttribute('id');
  let forLabel = todo.querySelector('[for=' + idInput + ']');
  let valueLabel = forLabel.innerHTML;

  todoList.forEach(function (item) {
    if (item.todo === valueLabel) {
      item.checked = !item.checked;
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  })

});


todo.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  todoList.forEach(function (item, i) {
    if (item.todo === e.target.innerHTML) {
      if (e.ctrlKey || e.metaKey) {
        todoList.splice(i, 1);
      } else {
        item.important = !item.important;
      }
      displayMessages();
      localStorage.setItem('todo', JSON.stringify(todoList));
    }
  })
})
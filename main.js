
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
  console.log(todoList);
  displayMessages();
  addEvent();
  localStorage.setItem('todo', JSON.stringify(todoList));
  addMessage.value = '';
});

function displayMessages() {
  let displayMessage = '';

  if (todoList.length === 0) todo.innerHTML = '';
  todoList.forEach(function (item, i) {
    displayMessage +=
      `
  <li class="list-group-item d-flex justify-content-between align-items-center ">
  <div>
    <input class="form-check-input me-1" type="checkbox" id='item_${i}' value="" aria-label="..." ${item.checked ? 'checked' : ''}>
   <label class="${item.important ? 'important' : ''}" for='item_${i}'>${item.todo}</label>
   </div>
   <button type="button" id='item_${i}' data-action="delete" class="btn btn-primary btn-sm" >Supprimer</button>
  </li>
    `;
    todo.innerHTML = displayMessage;
  })
};
function addEvent() {
  const deleteButtons = document.querySelectorAll('[data-action="delete"]');
  deleteButtons.forEach(function (item, i) {
    console.log(item, i);
    item.addEventListener('click', () => deleteTask(i));

  });
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

      item.important = !item.important;
    }
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todoList));

  })
})




function deleteTask(index) {
  console.log(todoList, index);
  const confirmed = confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
  if (confirmed) {
    todoList.splice(index, 1); // Supprime l'élément du tableau

    // Met à jour l'affichage
    localStorage.setItem('todo', JSON.stringify(todoList)); // Met à jour les données persistantes
    displayMessages();
    addEvent();
  }
}

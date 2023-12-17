//Global Structure where we will maintain the todo list
let todoList = [];
displayItems();

function addTodo() {
  let inputElement = document.querySelector('#todo-input');
  let todoitem = inputElement.value;

  let dateElement = document.querySelector('#todo-date');
  let todoDate = dateElement.value;

  let priorityElement = document.querySelector('#todo-priority');
  let priority = priorityElement.value;

  // Load existing tasks from local storage
  todoList = JSON.parse(localStorage.getItem('todoList')) || [];

  // Add new task to the list
  todoList.push({ item: todoitem, dueDate: todoDate, completed: false, priority });

  // Save the updated list to local storage
  localStorage.setItem('todoList', JSON.stringify(todoList));

  // Clear input fields
  inputElement.value = '';
  dateElement.value = '';
  priorityElement.value = '';

  // Display the updated list
  displayItems();
}

function displayItems() {
  let todoLocal = JSON.parse(localStorage.getItem('todoList')) || [];
  let containerElement = document.querySelector('.containerElement');

  // Clear existing content
  containerElement.innerHTML = '';

  let newHtml = '';

  for (let i = 0; i < todoLocal.length; i++) {
    let { item, dueDate, completed, priority } = todoLocal[i];

    newHtml += `
      <div class="todo-item ${completed ? 'completed' : ''}">
        <span class="new-todo">${item}</span>
        <p>
        <span>Due Date: ${dueDate}</span>
        <span class="paraText">Priority: ${priority}</span>
        </p>
        <p>
        <button class="btn-mark" onclick="markComplete(${i});"> ${
      completed ? 'Undo' : 'Mark Complete'
    }</button>
        <button class="btn-edit" onclick="editTodo(${i});">Edit</button>
        <button class="btn-del" onclick="removeTodo(${i});">Delete</button>
        </p>
      </div>`;
  }
  containerElement.innerHTML = newHtml;
}

function markComplete(index) {
  let todoLocal = JSON.parse(localStorage.getItem('todoList')) || [];
  todoLocal[index].completed = !todoLocal[index].completed;
  localStorage.setItem('todoList', JSON.stringify(todoLocal));
  displayItems();
}

function removeTodo(index) {
  let todoLocal = JSON.parse(localStorage.getItem('todoList')) || [];
  todoLocal.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todoLocal));
  displayItems();
}

function editTodo(index) {
  let todoLocal = JSON.parse(localStorage.getItem('todoList')) || [];
  let updatedItem = prompt('Enter the updated task:', todoLocal[index].item);
  if (updatedItem !== null) {
    todoLocal[index].item = updatedItem;
    localStorage.setItem('todoList', JSON.stringify(todoLocal));
    displayItems();
  }
}

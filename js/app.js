const formCreate = document.getElementById("form-create");
const formEdit = document.getElementById("form-edit");
const listGroupTodo = document.getElementById("list-group-todo");
const time = document.getElementById("time");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
/* time elements */
const fullDay = document.getElementById("full-day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");
const closeEl = document.getElementById("close");

// check
let todos = JSON.parse(localStorage.getItem("list")) ?
  JSON.parse(localStorage.getItem("list")) : [];

if (todos.length) showTodos();

// setTodos to localStorage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos));
}

// time
function getTime() {
  const now = new Date()
  const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
  const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth()
  const year = now.getFullYear()

  const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
  const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
  const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const month_title = now.getMonth()
  fullDay.textContent = `${date} ${months[month_title]}, ${year}`

  hourEl.textContent = hour
  minuteEl.textContent = minute
  secondEl.textContent = second

  return `${hour}:${minute}, ${date}.${month}.${year}`
}
setInterval(getTime, 1000)

// show todos
function showTodos() {
  const todos = JSON.parse(localStorage.getItem("list"));
  listGroupTodo.innerHTML = "";

  todos.forEach((item, i) => {
    listGroupTodo.innerHTML += `
    <li class="list-group-item d-flex justify-content-between">
    ${item.text}
    <div class="todo-icons">
      <span class="opacity-50 me-2">${item.time}</span>
      <img src="img/edit.svg" alt="icon" width="25" height="25" />
      <img src="img/delete.svg" alt="icon" width="25" height="25" />
    </div>
    </li> 
    `;
  });
}

// show error
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message;
  setTimeout(() => {
    document.getElementById(`${where}`).textContent = "";
  }, 2500);
}

// get todos
formCreate.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = formCreate["input-create"].value.trim();
  formCreate.reset();

  if (todoText.length) {
    todos.push({
      text: todoText,
      time: getTime(),
      completed: false,
    });
    setTodos();
    showTodos();
  } else {
    showMessage("message-create", "Please, enter some text...");
  }
});
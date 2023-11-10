const todos = document.querySelector("#todos");
const submitTodo = document.querySelector("#submitTodo");
const todoList = document.querySelector(".list-group");
const allTodoList = document.querySelectorAll(".list-group-item");
const clearButton = document.querySelector("#clearButton");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const searchTodo = document.querySelector("#searchTodo");
let listTodos = [];

run();

function run() {
  submitTodo.addEventListener("click", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", deleteItemToUI);
  clearButton.addEventListener("click", clearAllTodos);
  searchTodo.addEventListener("keyup", filter);
}
function filter(e) {
  const filteredValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filteredValue)) {
        todo.setAttribute("style", "display:block");
      } else {
        todo.setAttribute("style", "display:none !important");
      }
    });
  }
}
function pageLoaded() {
  checkTodosFromStorage();
  listTodos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
function deleteItemToUI(e) {
  if (e.target.className === "fa-solid fa-trash-can m-1") {
    const todo = e.target.parentElement.parentElement;
    todo.remove();

    deleteItemToStorage(todo.textContent);
    showAlert("success", "Silme işlemi başarılı...");
  }
}
function deleteItemToStorage(remove) {
  checkTodosFromStorage();
  listTodos.forEach(function (todo, index) {
    if (remove === todo) {
      listTodos.splice(index, 1);
    }
  });
  localStorage.setItem("listTodos", JSON.stringify(listTodos));
}
function clearAllTodos() {
  const allTodoList = document.querySelectorAll(".list-group-item");
  if (allTodoList.length > 0) {
    debugger;
    allTodoList.forEach(function (todo) {
      todo.remove();
    });
    showAlert("success", "Tüm todolar başarıyla silindi...");
    listTodos = [];
    localStorage.setItem("listTodos", JSON.stringify(listTodos));
  } else {
    showAlert("warning", "Ekranda silmek için en az bir todo olmalıdır...");
  }
}

function addTodo(e) {
  const inputText = todos.value.trim();
  if (inputText == null || inputText == "") {
    showAlert("warning", "Lütfen boş bırakmayınız ...");
  } else {
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    showAlert("success", "Başarılı bir şekilde todo eklendi ...");
  }
}

function addTodoToUI(newTodo) {
  const li = document.createElement("li");
  li.className =
    "form-control list-group-item d-flex justify-content-between mb-3";
  li.textContent = newTodo;
  const a = document.createElement("a");
  a.href = "#";
  a.className = "deleteItem";

  const i = document.createElement("i");
  i.className = "fa-solid fa-trash-can m-1";
  a.appendChild(i);
  li.appendChild(a);

  todoList.appendChild(li);
  todos.value = "";
}
function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  listTodos.push(newTodo);
  localStorage.setItem("listTodos", JSON.stringify(listTodos));
}
function checkTodosFromStorage() {
  if (localStorage.getItem("listTodos") === null) {
    listTodos = [];
  } else {
    listTodos = JSON.parse(localStorage.getItem("listTodos"));
  }
}
function showAlert(type, message) {
  const div = document.createElement("div");
  // div.className = "alert alert-" + type;
  div.className = `alert alert-${type} mt-2`;
  div.role = "alert";
  div.textContent = message;
  firstCardBody.appendChild(div);

  let opacity = 1;
  const fadeOutInterval = setInterval(function () {
    opacity -= 0.06; // Opaklığı azalt
    div.style.opacity = opacity;
    if (opacity <= 0) {
      clearInterval(fadeOutInterval); // Animasyonu durdur
      div.remove(); // Elementi kaldır
    }
  }, 100);
}

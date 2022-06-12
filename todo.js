const form = document.querySelector("form");
const input = document.querySelector("#txtTaskName");
const btnDeleteAll = document.querySelector("#btnDeleteAll");
const taskList = document.querySelector("#task-list");
let createItem;
eventListeners();
loadItems();

function eventListeners() {
  form.addEventListener("submit", addNewItem);
  taskList.addEventListener("click", deleteItem);
  btnDeleteAll.addEventListener("click", deleteAllItems);
}
function loadItems() {
  createItem = getItemsFromLs();

  createItem.forEach(function (item) {
    createItemFn(item);
  });
}
function getItemsFromLs() {
  if (localStorage.getItem("createItem") === null) {
    createItem = [];
  } else {
    createItem = JSON.parse(localStorage.getItem("createItem"));
  }
  return createItem;
}

function setItemToLS(text) {
  createItem = getItemsFromLs();
  createItem.push(text);
  localStorage.setItem("createItem", JSON.stringify(createItem));
}

function deleteItemFromLS(text) {
  createItem = getItemsFromLs();
  createItem.forEach(function (item, index) {
    if (item === text) {
      createItem.splice(index, 1);
    }
  });
  localStorage.setItem("createItem", JSON.stringify(createItem));
}

function createItemFn(text) {
  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(text));

  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class = "fas fa-times"></i>';

  li.appendChild(a);

  taskList.appendChild(li);
}
function deleteItem(e) {
  if (e.target.className === "fas fa-times") {
    e.target.parentElement.parentElement.remove();

    deleteItemFromLS(e.target.parentElement.parentElement.textContent);
  }
  e.preventDefault();
}

function addNewItem(e) {
  if (input.value === "") {
    alert("add new item");
  }

  const li = document.createElement("li");
  li.className = "list-group-item list-group-item-secondary";
  li.appendChild(document.createTextNode(input.value));

  const a = document.createElement("a");
  a.classList = "delete-item float-right";
  a.setAttribute("href", "#");
  a.innerHTML = '<i class="fas fa-times"></i>';

  li.appendChild(a);

  taskList.appendChild(li);
  setItemToLS(input.value);
  input.value = "";

  e.preventDefault();
}
function deleteAllItems(e) {
  if (confirm("are you sure")) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
  }
  e.preventDefault();
}

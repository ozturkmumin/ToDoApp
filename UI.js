class UI {
  constructor(todoText) {
    this.todoText = todoText;
  }

  static deleteTodo(e) {
    if (e.target.className === "fas fa-times") {
      e.target.parentElement.parentElement.remove();
    }
  }

  static addTodo(e) {
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

    input.value = "";

    e.preventDefault();
  }

  static deleteAll() {
    if (confirm("Are you sure?")) {
      taskList.innerHTML = "";
    }
  }
}

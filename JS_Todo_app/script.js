let form = document.getElementById("form");
let input = document.getElementById("input");
let taskList = document.getElementById("task-list");
let completeTask = document.getElementById("complete-task");
let validate = document.getElementById("validate-msg");
let add = document.getElementById("add");
let Editinput = document.getElementById("edit-input");

let todo = [];
let CompleteTodo = [];
editMode = false;
editId = "";
editModeComplete = false;
editIdComplete = "";

(() => {
  todo = JSON.parse(localStorage.getItem("data")) || [];
  CompleteTodo = JSON.parse(localStorage.getItem("Completedata")) || [];
  console.log(todo);
  console.log(CompleteTodo);
  Tasklist();
  CompleteTasks();
})();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //for form validation if user leave input empty
  formvalidation();
});

//for form validation if user leave input empty
function formvalidation() {
  if (input.value === "") {
    validate.innerHTML = "This can't be empty";
  } else {
    validate.innerHTML = "";
    //if user enter input then we will accept data
    acceptData();
    reset();
  }
}

//if user enter input then we will accept data
function acceptData() {
  if (editMode) {
    todo = todo.map((oneTodo) => {
      if (oneTodo.id === editId) {
        return {
          id: editId,
          task: input.value,
        };
      } else {
        return oneTodo;
      }
    });
    editId = "";
    editMode = false;
  } else if (editModeComplete) {
    CompleteTodo = CompleteTodo.map((oneTodo) => {
      if (oneTodo.id === editIdComplete) {
        return {
          id: editIdComplete,
          task: input.value,
        };
      } else {
        return oneTodo;
      }
    });

    localStorage.setItem("Completedata", JSON.stringify(CompleteTodo));
    editIdComplete = "";
    editModeComplete = false;
  } else {
    let uid = Date.now().toString(36) + Math.random().toString(36).substr(2);
    todo.push({
      id: uid,
      task: input.value,
    });
  }

  localStorage.setItem("data", JSON.stringify(todo));
  Tasklist();
  CompleteTasks();
}

//Show ALl Task
function Tasklist() {
  taskList.innerHTML = "";
  todo.map((x) => {
    const { id, task } = x;
    return (taskList.innerHTML += `
        <li id=${x.id}>
        <input type="checkbox" id="myCheck" onclick = "CheckTask(${id})">
        <span>${task}</span>
        <div class="todo__btn">
        <button class="editBtn" onclick = "editTask(${id})">Edit</button>
        <button class="deleteBtn" onclick = "deleteTask(${id})">Delete</button>
        </div>
      </li>
      <hr/>
    `);
  });
}

//ALl Completed Task
function CompleteTasks() {
  completeTask.innerHTML = "";
  CompleteTodo.map((x) => {
    const { id, task } = x;
    return (completeTask.innerHTML += `
        <li id=${x.id}>
        <input type="checkbox" id="myCheck" checked onclick = "unCheckTask(${id})">
        <span><s>${task}</s></span>
        <div class="todo__btn">
        <button class="editBtn" onclick = "editCompleteTask(${id})">Edit</button>
        <button class="deleteBtn" onclick = "deleteCompleteTask(${id})">Delete</button>
        </div>
      </li>
      <hr/>
    `);
  });
}

//Delete Task

function deleteTask(x) {
  if (confirm("Want to delete?")) {
    todo = todo.filter((todo) => {
      return todo.id !== x.id;
    });
  }
  localStorage.setItem("data", JSON.stringify(todo));
  Tasklist();
  console.log(x.id);
  reset();
}

//Edit Task

function editTask(x) {
  editMode = true;
  let filterTodo = todo.find((todo) => todo.id === x.id);
  editId = filterTodo.id;
  console.log(filterTodo);
  if (filterTodo) {
    input.value = filterTodo.task;
  }
}

//Check to completed
function CheckTask(e) {
  filterTodo = todo.find((todo) => todo.id === e.id);
  todo = todo.filter((todo) => todo.id !== filterTodo.id);
  // console.log(filterTodo);
  CompleteTodo.push({
    id: filterTodo.id,
    task: filterTodo.task,
  });
  localStorage.setItem("data", JSON.stringify(todo));
  localStorage.setItem("Completedata", JSON.stringify(CompleteTodo));
  Tasklist();
  CompleteTasks();
}

//Delete Completed Task

function deleteCompleteTask(x) {
  if (confirm("Want to delete?")) {
    CompleteTodo = CompleteTodo.filter((todo) => {
      return todo.id !== x.id;
    });
  }
  localStorage.setItem("Completedata", JSON.stringify(CompleteTodo));
  CompleteTasks();
  console.log(x.id);
  reset();
}

//Edit Completed Task

function editCompleteTask(x) {
  editModeComplete = true;
  let filterTodo = CompleteTodo.find((todo) => todo.id === x.id);
  editIdComplete = filterTodo.id;
  console.log(filterTodo);
  if (filterTodo) {
    input.value = filterTodo.task;
  }
}

//Check to Incomplete
function unCheckTask(x) {
  let filterTodo = CompleteTodo.find((todo) => todo.id === x.id);
  CompleteTodo = CompleteTodo.filter((todo) => todo.id !== filterTodo.id);

  todo.push({
    id: filterTodo.id,
    task: filterTodo.task,
  });
  localStorage.setItem("data", JSON.stringify(todo));
  localStorage.setItem("Completedata", JSON.stringify(CompleteTodo));
  Tasklist();
  CompleteTasks();
}

function reset() {
  input.value = "";
}

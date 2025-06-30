// darkmode
const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {
  document.body.classList.toggle("darkmode");
});

// clear input area
function clearInputField() {
  document.getElementById("titleinput").value = "";
  document.getElementById("descinput").value = "";
}

// Update todoist stats
let totaltodos = 0;
let pendingtodos = 0;
let completedtodos = 0;

function updateStats() {
  document.getElementById(
    "totaltodos"
  ).textContent = `Total Todos: ${totaltodos}`;
  document.getElementById(
    "pendingtodos"
  ).textContent = `Pending Todos: ${pendingtodos}`;
  document.getElementById(
    "completedtodos"
  ).textContent = `Completed Todos: ${completedtodos}`;
}

// remove no todos added yet! text
function cleaner() {
  const notodosspan = document.getElementById("notodos");
  if (notodosspan) {
    notodosspan.remove();
  }
}

document.querySelector('.searchinput').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  const todos = document.querySelectorAll('.domtodo');
  
  todos.forEach(todo => {
    const title = todo.querySelector('h3').textContent.toLowerCase();
    const description = todo.querySelector('p').textContent.toLowerCase();
    
    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      todo.style.display = 'flex';
      todo.classList.add('domtodohighlight');
    } else {
      todo.style.display = 'none';
      todo.classList.remove('domtodohighlight');
    }
  });
  
  // If no todos are visible and search term isn't empty, show a message
  const visibleTodos = document.querySelectorAll('.domtodo[style="display: flex;"]');
  const noTodosSpan = document.getElementById('notodos');
  
  if (visibleTodos.length === 0 && searchTerm !== '') {
    if (!noTodosSpan) {
      const noResults = document.createElement('span');
      noResults.id = 'notodos';
      noResults.textContent = 'No todos match your search!';
      document.getElementById('todos').appendChild(noResults);
    } else {
      noTodosSpan.textContent = 'No todos match your search!';
    }
  } else if (searchTerm === '' && noTodosSpan) {
    noTodosSpan.remove();
  }
});

// highlighting todo
function highlighttodo(){
  const todo = document.getElementById("domtodo");
  todo.classList.add("domtodohighlight");
}

// add todo function
function addTodo() {
  // cleaner
  cleaner();

  const todowrapper = document.createElement("div");
  todowrapper.className = "todowrapper";
  const title = document.createElement("h3");
  const titleNode = document.getElementById("titleinput").value;

  // show error on not providing todo title
  if (!titleNode) {
    Toastify({
      text: "Please enter a todo title!",
      duration: 3000,
      gravity: "top",
      position: "left",
      style: {
        background: "linear-gradient(to right,rgb(129, 129, 129),rgb(255, 255, 255))",
      },
    }).showToast();
    return;
  }

  title.append(titleNode);
  const descwrapper = document.createElement("div");
  descwrapper.className = "descwrapper";
  const desc = document.createElement("p");
  const descNode = document.getElementById("descinput").value;
  desc.append(descNode);
  descwrapper.append(desc);
  const box = document.createElement("div");
  box.className = "domtodo";
  box.id = "domtodo";
  todowrapper.append(title);
  todowrapper.append(descwrapper);
  box.append(todowrapper);

  // accessing main div element for todos
  const todos = document.getElementById("todos");
  todos.appendChild(box);

  // button wrapper
  const buttonwrapper = document.createElement("div");
  buttonwrapper.className = "buttonwrapper";

  // delete button
  const deletebutton = document.createElement("button");
  deletebutton.innerText = "Delete";
  deletebutton.className = "deletebutton";
  buttonwrapper.append(deletebutton);

  // done button
  const donebutton = document.createElement("button");
  donebutton.innerText = "Done";
  donebutton.className = "donebutton";
  buttonwrapper.append(donebutton);

  // button wrapper
  box.append(buttonwrapper);

  // updating stats after addition
  totaltodos++;
  pendingtodos++;
  updateStats();

  // clearing inputs after todo addition
  clearInputField();

  // Show success toast
  Toastify({
    text: "Todo added successfully!",
    duration: 3000,
    gravity: "top",
    position: "left",
    style: {
      background: "linear-gradient(to right,rgb(236, 248, 246),rgb(213, 217, 206))",
    },
  }).showToast();

  // delete button function
  deletebutton.onclick = function () {
    let todo = document.getElementById("domtodo");
    todo.remove();
    Toastify({
      text: "Todo deleted successfully!",
      duration: 3000,
      gravity: "top",
      position: "left",
      style: {
        background:
          "linear-gradient(to right,rgb(248, 243, 236),rgb(241, 241, 229))",
      },
    }).showToast();
    totaltodos--;
    pendingtodos--;
    updateStats();
  };

  // done button function
  donebutton.onclick = function () {
    let todo = document.getElementById("domtodo");
    todo.remove();
    Toastify({
      text: "Todo completed successfully!",
      duration: 3000,
      gravity: "top",
      position: "left",
      style: {
        background:
          "linear-gradient(to right,rgb(229, 221, 248),rgb(210, 206, 217))",
      },
    }).showToast();
    totaltodos--;
    pendingtodos--;
    completedtodos++;
    updateStats();
  };
}

updateStats();

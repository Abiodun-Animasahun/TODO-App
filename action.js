let form = document.getElementById("form");
let textarea = document.getElementById("textarea");
let textInput = document.getElementById("textInput");
let timeInput = document.getElementById("timeInput");
let dateInput = document.getElementById("dateInput");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

//let not user submit blank input

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formValidation();
});
// validate the form or not
let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be empty";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    // Upon validation, close modal
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// Declaring the variable that accept input to the array
let data = [];

// function to push the text input to the local storage

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    time: timeInput.value,
    description: textarea.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

// Creating new tasks to establish "Create" in CRUD

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((element, index) => {
    return (tasks.innerHTML += `
    <div id=${index}>
        <span class="fw-bold">${element.text}</span>
        <span class="small text-secondary">${element.date}</span>
        <span class="small text-secondary">${element.time}</span>
        <p>${element.description}</p>

        <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle= "modal" data-bs-target= "#form" class= "fas fa-edit"></i>
            <i onClick= "deleteTask(this);createtask()" class= "fas fa-trash-alt"></i>
        </span>
    </div>
    `);
  });
  resetForm();
};

// clearing the input field

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
  textarea.value = "";
};

// Delete tasks to establish "Delete" in CRUD
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
};

// Edit tasks to establish "Update" in CRUD
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  timeInput.value = selectedTask.children[2].innerHTML;
  textarea.value = selectedTask.children[3].innerHTML;

  deleteTask(e);
};

// To collect data from Localstorage to establish "Read" in CRUD

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();

const input = document.querySelector("input");
const button = document.querySelector("button");
const taskList = document.getElementById("taskList");
const dateInput = document.getElementById("dueDate");
const today = new Date().toISOString().split("T")[0];
dateInput.setAttribute("min", today);

button.addEventListener("click", function (event) {
  event.preventDefault();

  const task = input.value;
  const dueDate = dateInput.value;

  if (dueDate && dueDate < today) {
    dateInput.setCustomValidity("The due date cannot be in the past.");
    dateInput.reportValidity();
    return;
  } else {
    dateInput.setCustomValidity("");
  }

  if (!input.checkValidity()) {
    input.reportValidity();
    return;
  }

  const li = document.createElement("li");
  li.textContent = task;

  if (!dueDate) {
    dateInput.setCustomValidity("Please select a due date.");
    dateInput.reportValidity();
    return;
  }
  li.textContent = task.toUpperCase() + " (Due: " + dueDate + ")";

  const notification = document.createElement("div");
  notification.textContent = "Task added successfully!";
  notification.style.color = "green";
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 2000);

  li.style.padding = "10px";
  li.style.margin = "5px 0";
  li.style.backgroundColor = "#f9f9f9";
  li.style.borderRadius = "5px";
  li.style.border = "1px solid #ddd";
  li.style.display = "flex";
  li.style.justifyContent = "space-between";
  li.style.alignItems = "center";

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.alignItems = "center";

  deleteButton.style.backgroundColor = "#ff6b6b";
  deleteButton.style.border = "none";
  deleteButton.style.color = "white";
  deleteButton.style.cursor = "pointer";
  deleteButton.style.borderRadius = "3px";

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.style.backgroundColor = "#4CAF50";
  editButton.style.border = "none";
  editButton.style.color = "white";
  editButton.style.cursor = "pointer";
  editButton.style.borderRadius = "3px";
  editButton.style.marginLeft = "10px";

  deleteButton.addEventListener("click", function () {
    taskList.removeChild(li);
  });

  editButton.addEventListener("click", function () {
    const newTask = prompt("Edit your task:", task);
    const newDueDate = prompt("Edit due date:", dueDate);
    if (newTask && newDueDate) {
      li.textContent = newTask.toUpperCase() + " (Due: " + newDueDate + ")";
      li.appendChild(buttonContainer);
      highlightTodayTasks();
    }
  });

  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);

  li.appendChild(buttonContainer);

  taskList.appendChild(li);

  input.value = "";
  dateInput.value = "";
  highlightTodayTasks();
});

input.addEventListener("input", function () {
  if (input.value.trim().length < 3) {
    input.setCustomValidity("Task must be at least 3 characters.");
  } else {
    input.setCustomValidity("");
  }
});

taskList.addEventListener("click", function (event) {
  if (
    event.target.tagName === "BUTTON" &&
    event.target.textContent === "Edit"
  ) {
    const li = event.target.parentNode;
    const taskContent = li.firstChild.textContent;
    const newTask = prompt("Edit your task:", taskContent);
    if (newTask) {
      li.firstChild.textContent = newTask;
    }
  }
});

window.addEventListener("beforeunload", function (event) {
  event.preventDefault();
  event.returnValue = "";
});

function highlightTodayTasks() {
  const tasks = document.querySelectorAll("li");
  tasks.forEach((task) => {
    const taskText = task.textContent;
    const dueDateMatch = taskText.match(/\(Due: (.+)\)/);
    if (dueDateMatch) {
      const dueDate = dueDateMatch[1];
      if (dueDate === today) {
        task.style.backgroundColor = "#ffeb3b";
      } else {
        task.style.backgroundColor = "#f9f9f9";
      }
    }
  });
}

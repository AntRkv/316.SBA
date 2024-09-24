const form = document.querySelector("form");
const button = document.querySelector("button");

button.addEventListener("click", function (event) {
  event.preventDefault(); 

  const input = form.querySelector("input");
  const task = input.value;

  if (task.trim() !== "") {
     const li = document.createElement("li");
     li.textContent = task;

     const deleteButton = document.createElement("button");
     deleteButton.textContent = "Delete";
    //  deleteButton.style.marginLeft = "10px";

    
     deleteButton.addEventListener("click", function () {
       taskList.removeChild(li); 
     });

     li.appendChild(deleteButton);
     taskList.appendChild(li);
     input.value = "";
   }
  
});




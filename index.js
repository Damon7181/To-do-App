PressEnterToSave("#main input", "#add");

const addButton = document.querySelector("#add");

addButton.onclick = addTask;
window.onload = onRefresh;

// Main Functions
function addTask() {
  // debugger;
  const inputValue = document.querySelector("#main input").value;
  //Localstorage Function
  storeTextOnLocalStorage(inputValue);

  if (inputValue.length == 0) {
    alert("Please write something...");
  } else {
    //this function is creating the whole task div
    createTask(inputValue);
    // 🔥 Store in Firestore
  }
}
function onRefresh() {
  let data = JSON.parse(localStorage.getItem("data")) || [];

  showDataAfterRefresh(data);
}

//Sub Functions
function storeTextOnLocalStorage(inputValue) {
  // debugger;
  let data = JSON.parse(localStorage.getItem("data")) || [];
  data.push(inputValue);
  localStorage.setItem("data", JSON.stringify(data));
}
function createTask(inputValue) {
  // debugger;
  document.querySelector(
    "#Content"
  ).innerHTML += ` <div class="task">           
            <span id="taskname">
                 ${inputValue}
             </span>        
          
        <div class="buttons">
            <button class="edit" onclick="editWholeTask(event)">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>        
            <button class="delete">
              <i class="fa-solid fa-trash" onclick="removeWholeTask(event)"></i>
            </button>
            <button class="view" onclick="viewWholeTask(event)">
              <i class="fa-regular fa-eye"></i>
            </button>
      </div>
    `;
}
function removeWholeTask(event) {
  let data = JSON.parse(localStorage.getItem("data")) || [];

  const parentTaskdiv = event.target.parentElement.parentElement;
  // console.log(parentTaskdiv);
  const task = parentTaskdiv.parentElement;
  // console.log(task);
  const current_span = task.querySelector("span");
  const current_text = current_span.textContent;
  console.log(current_text);
  //we used trim to remove extra spaces around the sentence => "  hello world   " will become "hello world" after trim function.
  const trimData = current_text.trim();
  task.remove();

  for (let j = 0; j < data.length; j++) {
    if (data[j] === trimData) {
      data.splice(j, 1);
      break;
    }
  }
  localStorage.setItem("data", JSON.stringify(data));
}
function viewWholeTask(event) {
  // debugger;
  console.log("event", event);
  const element = event.target.parentElement;
  const element2 = element.parentElement;
  const task = element2.parentElement;
  const taskText = task.querySelector("span");
  alert("Whole task was: " + taskText.textContent.trim());
}
function PressEnterToSave(ClassOrIdOfMainInput, ClassOrIdOfButton) {
  //for adding the text of input using enter
  const inputfield = document.querySelector(ClassOrIdOfMainInput);
  inputfield.addEventListener("keydown", function (event) {
    //"Keydown is jab hum koi bhi key press karty and "Keyup" jab hum koi bhi key press kar k chorty..... insy bht sy events ban sakty
    if (event.key === "Enter") {
      // debugger;
      document.querySelector(ClassOrIdOfButton).click();
    }
  });
}
function editWholeTask(event) {
  const edit = event.target.parentElement.parentElement;
  console.log(edit);
  const task = edit.parentElement;
  const taskdata = task.querySelector("span");
  taskdata.innerHTML = `
        <div class="input-div">
        <input type="text" class ="input-value" id="" value="${taskdata.textContent.trim()}"  />
       </div>        
        `;
  const savebtn = task.querySelector(".edit");
  // Replace edit button with Save button
  savebtn.innerHTML = `
      <i class="fa-solid fa-save" id="saveButton"></i>
        `;

  savebtn.onclick = function () {
    // debugger;
    const inputdata = document.querySelector(".input-value").value;

    console.log(inputdata);
    taskdata.innerHTML = inputdata;

    let totaltasks = document.querySelectorAll(".task");
    let data = JSON.parse(localStorage.getItem("data")) || [];

    // debugger;
    for (let i = 0; i < totaltasks.length; i++) {
      if (totaltasks[i] === task) {
        data[i] = inputdata;
        break;
      }
    }
    localStorage.setItem("data", JSON.stringify(data));
    savebtn.innerHTML = `
          <i class="fa-regular fa-pen-to-square"></i>
            `;
  };
}
function showDataAfterRefresh(data) {
  for (var i = 0; i < data.length; i++) {
    document.querySelector("#Content").innerHTML += `
      <div class="task">           
        <span id="taskname">${data[i]}</span>        
        <div class="buttons">
          <button class="edit" onclick="editWholeTask(event)">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>        
          <button class="delete">
            <i class="fa-solid fa-trash" onclick="removeWholeTask(event)"></i>
          </button>
          <button class="view" onclick="viewWholeTask(event)">
            <i class="fa-regular fa-eye"></i>
          </button>
        </div>
      </div>
    `;
  }
}

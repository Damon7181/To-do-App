let count = 0;
let deleteCount = 0;

//for adding the text of input using enter
// const inputfield = document.querySelector("#main input");
// inputfield.addEventListener("keydown", function (event) {
//   //"Keydown is jab hum koi bhi key press karty and "Keyup" jab hum koi bhi key press kar k chorty..... insy bht sy events ban sakty
//   if (event.key === "Enter") {
//     // debugger;
//     document.querySelector("#add").click();
//   }
// });

PressEnterToSave("#main input");

const addButton = document.querySelector("#add");

addButton.onclick = function () {
  const inputValue = document.querySelector("#main input").value;
  //For storing data in local storage
  // humesha local storage ki key ka naam voi rakhna jo ap apnay variable ka rakh ray.... in this case'data'
  let data = JSON.parse(localStorage.getItem("data")) || [];
  data.push(inputValue);
  localStorage.setItem("data", JSON.stringify(data));
  // debugger;
  // console.log(data);

  // data.forEach((task) => {
  //   console.log(task);
  // });

  if (inputValue.length == 0) {
    alert("Please write something...");
  } else {
    // Main code
    // let shortText =
    //   inputValue.length > 20 ? inputValue.substring(0, 20) + "..." : inputValue;
    document.querySelector("#Content").innerHTML += `
      <div class="task">           
            <span id="taskname">
                 ${inputValue}
             </span>        
          
        <div class="buttons">
            <button class="edit">
              <i class="fa-regular fa-pen-to-square"></i>
            </button>        
            <button class="delete">
              <i class="fa-solid fa-trash"></i>
            </button>
            <button class="view">
              <i class="fa-regular fa-eye"></i>
            </button>
      </div>
    `;

    let current_tasks = document.querySelectorAll(".delete");
    for (let i = 0; i < current_tasks.length; i++) {
      current_tasks[i].onclick = function () {
        //console.log("hello onr ", current_tasks.length);
        //this.closest(".task").remove();
        // alert("Task Deleted");
        // debugger;
        const task = this.closest(".task");
        const current_text = task.querySelector("#taskname").textContent;
        //we used trim to remove extra spaces around the sentence => "  hello world   " will become "hello world" after trim function.
        const a = current_text.trim();
        task.remove();

        for (let j = 0; j < data.length; j++) {
          if (data[j] === a) {
            data.splice(j, 1);
            break;
          }
        }
        localStorage.setItem("data", JSON.stringify(data));

        // setTimeout(() => {
        //   alert("Task Deleted");
        // }, 200);
      };
    }

    let viewTask = document.querySelectorAll(".view");
    // debugger;
    // console.log(viewTask.length);
    for (var i = 0; i < viewTask.length; i++) {
      viewTask[i].onclick = function () {
        // debugger;
        const task = this.closest(".task");
        const taskText = task.querySelector("#taskname");
        // const fullValue =
        //   taskText.innerHTML.substring(0, 20) + inputValue.substring(20);
        alert("Whole task was: " + taskText.textContent);
      };
    }

    // let editTask = (document.querySelector(".edit").onclick = function () {
    //   const taskText = document.querySelector("#taskname");
    //   const updatedText = prompt("Edit Task: ", taskText.textContent);
    //   if (updatedText.length > 0) {
    //     taskText.innerHTML = updatedText;
    //     alert("Task Updated");
    //   }
    // });

    // let editTask = document.querySelectorAll(".edit");
    // for (var i = 0; i < editTask.length; i++) {
    //   editTask[i].onclick = function () {
    //     // debugger;

    //     const task = this.closest(".task");
    //     const taskdata = task.querySelector("#taskname");
    //     const updatedText = prompt("Edit Task: ", taskdata.textContent);
    //     if (updatedText.length > 0) {
    //       // debugger;
    //       // console.log(updatedText);
    //       taskdata.textContent = updatedText;
    //       // console.log(taskdata.textContent);
    //       alert("Task Updated");
    //     }
    //   };
    // }

    let editTask = document.querySelectorAll(".edit");
    for (var i = 0; i < editTask.length; i++) {
      editTask[i].onclick = function () {
        // debugger;

        const task = this.closest(".task");
        const taskdata = task.querySelector("#taskname");

        taskdata.innerHTML = `

        <div class="input-div">
        <input type="text" class ="input-value" id="" value="${taskdata.textContent.trim()}"  />
       </div>        
        `;
        //   const savebtn = task.querySelector(".edit");
        //   savebtn.innerHTML = `
        //       <button class="edit" onclick="saveContent()">
        //         Save
        //       </button>
        // `;
        const savebtn = task.querySelector(".edit");
        // Replace edit button with Save button
        savebtn.innerHTML = `
      <i class="fa-solid fa-save"></i>
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
          // setTimeout(() => {
          //   alert("Task Updated");
          // }, 200);
        };
      };
    }
  }
};
window.onload = function () {
  let data = JSON.parse(localStorage.getItem("data")) || [];
  // debugger;
  for (var i = 0; i < data.length; i++) {
    document.querySelector("#Content").innerHTML += `
      <div class="task">           
        <span id="taskname">${data[i]}</span>        
        <div class="buttons">
          <button class="edit">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>        
          <button class="delete">
            <i class="fa-solid fa-trash"></i>
          </button>
          <button class="view">
            <i class="fa-regular fa-eye"></i>
          </button>
        </div>
      </div>
    `;
  }
  // let current_tasks = document.querySelectorAll(".delete");
  // // console.log(current_tasks.length);
  // for (var i = 0; i < current_tasks.length; i++) {
  //     current_tasks[i].onclick = function () {
  //     console.log("Current task", current_tasks);
  //     const task = this.closest(".task");
  //     task.remove();
  //     // debugger;
  //     // console.log(data[2]);
  //     // var count = 0;
  //     // data.forEach((task) => {
  //     //   count++;
  //     // });
  //     // var count = data.length;
  //     // if (count % 2 != 0) {
  //     //   data.splice(count / 2, 1);
  //     //   localStorage.setItem("data", JSON.stringify(data));
  //     // } else {
  //     //   data.splice(count / 2 - 1, 1);
  //     //   localStorage.setItem("data", JSON.stringify(data));
  //     // }
  //     if (data[i] === task) {
  //       data.splice(i, 1);
  //       localStorage.removeItem("data", JSON.stringify(data));
  //       alert("Task Deleted");
  //       // break;
  //     }

  //     // setTimeout(() => {
  //     // }, 200);
  //   };
  // }
  let current_tasks = document.querySelectorAll(".delete");

  for (let i = 0; i < current_tasks.length; i++) {
    current_tasks[i].onclick = function () {
      // debugger;
      const taskElement = this.closest(".task");
      const taskName = taskElement.querySelector("#taskname").textContent;

      taskElement.remove();

      for (let j = 0; j < data.length; j++) {
        if (data[j] === taskName) {
          data.splice(j, 1);
          break;
        }
      }

      localStorage.setItem("data", JSON.stringify(data));

      // alert("Task Deleted");
    };
  }

  // let viewTask = (document.querySelector(".view").onclick = function () {
  //   alert("Whole Task was: " + inputValue);
  // });

  let viewTask = document.querySelectorAll(".view");
  // debugger;
  // console.log(viewTask.length);
  for (var i = 0; i < viewTask.length; i++) {
    viewTask[i].onclick = function () {
      // debugger;
      const task = this.closest(".task");
      const taskText = task.querySelector("#taskname");
      // const fullValue =
      //   taskText.innerHTML.substring(0, 20) + inputValue.substring(20);
      alert("Whole task was: " + taskText.textContent);
    };
  }

  let editTask = document.querySelectorAll(".edit");
  for (var i = 0; i < editTask.length; i++) {
    editTask[i].onclick = function () {
      // debugger;

      const task = this.closest(".task");
      const taskdata = task.querySelector("#taskname");

      taskdata.innerHTML = `
        <div class="input-div">
        <input type="text" class ="input-value" value="${taskdata.textContent}"/>
        </div>     
        `;
      //   const savebtn = task.querySelector(".edit");
      //   savebtn.innerHTML = `
      //       <button class="edit" onclick="saveContent()">
      //         Save
      //       </button>
      // `;
      const savebtn = task.querySelector(".edit");
      // Replace edit button with Save button
      savebtn.innerHTML = `
      <i class="fa-solid fa-save"></i>
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
        // setTimeout(() => {
        //   alert("Task Updated");
        // }, 200);
      };
    };
  }
};
// function AddNewLine() {
//   var table = document.getElementById("custom-table");
//   //row
//   var newRow = table.insertRow();
//   //columns of row
//   var cell1 = newRow.insertCell(0);
//   var cell2 = newRow.insertCell(1);
//   var cell3 = newRow.insertCell(2);
//   var cell4 = newRow.insertCell(3);

//   //entering values

//   //Cell 1
//   cell1.innerHTML = ++count + "-";
//   //Cell
//   const input = document.createElement("input");
//   input.type = "text";
//   input.className = "text-input";
//   input.placeholder = "Write your todo's here";

//   cell2.appendChild(input);
//   //Cell 3
//   const addLink = document.createElement("a");
//   addLink.href = "#";
//   addLink.title = "Add new row";
//   addLink.onclick = AddNewLine;
//   //add icon
//   const icon = document.createElement("i");
//   icon.className = "fa-solid fa-plus";
//   icon.style.fontSize = "25px";

//   addLink.appendChild(icon);
//   cell3.appendChild(addLink);

//   const deleteRow = document.createElement("a");
//   deleteRow.href = "#";
//   deleteRow.title = "Delete This row";
//   deleteRow.onclick = function () {
//     RemoveCurrentLine(this);
//   };
//   //add icon
//   const icon2 = document.createElement("i");
//   icon2.className = "fa-solid fa-trash";
//   icon2.style.fontSize = "25px";

//   deleteRow.appendChild(icon2);
//   cell4.appendChild(deleteRow);
//   console.log("add" + count);
// }

// function RemoveCurrentLine(current) {
//   const row = current.closest("tr");
//   row.parentNode.removeChild(row);
//   deleteCount++;
//   count--;
//   console.log("Delete" + deleteCount + "," + count);
// }
function PressEnterToSave(ClassOrId) {
  //for adding the text of input using enter
  const inputfield = document.querySelector(ClassOrId);
  inputfield.addEventListener("keydown", function (event) {
    //"Keydown is jab hum koi bhi key press karty and "Keyup" jab hum koi bhi key press kar k chorty..... insy bht sy events ban sakty
    if (event.key === "Enter") {
      // debugger;
      document.querySelector("#add").click();
    }
  });
}

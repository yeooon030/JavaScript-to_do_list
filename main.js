let underLine = document.getElementById("under-line");
let taskTabs = document.querySelectorAll(".task-tabs div");
let addBtn = document.getElementById("add-button");
let userInput = document.getElementById("task-input");
let taskList = [];
let filteredList = [];
let selectedMenu = "tab-all";

console.log(taskList);

addBtn.addEventListener("click", addTask);
userInput.addEventListener("keydown", function(event){
    if(event.keyCode === 13){
      addTask(event);
    }
  }
)

for(let i=0;i<taskTabs.length;i++){
  taskTabs[i].addEventListener("click", function(event){
    filter(event);
  })
}

function addTask(){
  let taskValue = userInput.value;
  let task = {
    content: taskValue,
    isComplete: false,
    id: randomIDGenerator(),
  }
  taskList.push(task);
  userInput.value = "";
  render();  
}

function render(){
  let resultHTML = "";
  list = [];
  if(selectedMenu == "tab-all"){
    list = taskList;
  }else{
    list = filteredList;
  }

  for(let i=0;i<list.length;i++){
    if(list[i].isComplete == true){
      resultHTML += `<div class="task task-done" id="${list[i].id}">
      <span>${list[i].content}</span>
      <div id="button-area">
        <button onclick=toggleDone(id="${list[i].id}")>Check</button>
        <button onclick=deleteTask(id="${list[i].id}")>Delete</button>
      </div>
    </div>`
    }else{
      resultHTML += `<div class="task" id="${list[i].id}">
      <span>${list[i].content}</span>
      <div id="button-area">        
        <button onclick=toggleDone(id="${list[i].id}")>Check</button>
        <button onclick=deleteTask(id="${list[i].id}")>Delete</button>
      </div>
    </div>`
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleDone(id){
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id){
  for(let i=0;i<taskList.length;i++){
    if(taskList[i].id == id){
      taskList.splice(0,1);
      break;
    }
  }
  filter();
}

function filter(event){
  if(event){
    selectedMenu = event.target.id;
    underLine.style.left = event.currentTarget.offsetLeft + "px";
    underLine.style.width = event.currentTarget.offsetWidth + "px";
    underLine.style.top = event.currentTarget.offsetheight + "px";
  }

  filteredList = [];
  if(selectedMenu == "tab-ongoing"){
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete == false){
        filteredList.push(taskList[i]);
      }
    }
  }else if(selectedMenu == "tab-done"){
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete){
        filteredList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerator(){
  return "_" + Math.random().toString(36).substr(2, 9);
}
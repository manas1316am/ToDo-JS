// Change Background
const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];

const clear = document.querySelector(".clear");
const list = document.querySelector(".list");
const input = document.querySelector(".input");
const changeBackground = document.querySelector(".btn_hero");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// LIST is an array in which we have to add todo to show
// id is index of the array
let LIST, id;

// ===================
// LocalStorage
// ===================

// getting data from localstorage
let data = localStorage.getItem("TODO"); 

if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

// load localstorage
function loadList(array) {
  array.forEach(function (item) {
    addTodo(item.name, item.id, item.done, item.trash);
  });
}

// clear localstorage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

function addTodo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

const DONE = done ? CHECK : UNCHECK;
const LINE = done ? LINE_THROUGH : "";

// `` key is above ur TAB button

const item = `  <li class='item'>
                <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                <p class="text" ${LINE} > ${toDo}</p>
                <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                </li>
            `;

const position = "beforeend";
list.insertAdjacentHTML(position, item);

}

// Add the element after pressing enter key
document.addEventListener("keyup", function(e){
    if(e.keyCode == 13){
        const toDo = input.value;

        //if the input isn't empty
        if(toDo){
            addTodo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false, 
                trash: false,
            });

            // add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST))
            id++;
       }
       input.value= "";
    }
});

// complete todo
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// Remove todo
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(e){
    const element = e.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element)
    }
    else if(elementJob == "delete"){
        removeToDo(element)
    }

    //add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST))
});

changeBackground.addEventListener("click", function() {
    let hexColor= "#";
    for(let i=0; i<6; i++){
        hexColor += hex[getRandomNumber()];
        
    }
   
    document.body.style.backgroundColor = hexColor;
})

//random number
function getRandomNumber() {
    return Math.floor(Math.random() * hex.length);
}
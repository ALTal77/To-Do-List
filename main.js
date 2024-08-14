"use strict";
import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const toDoList=new ToDoList();

document.addEventListener('readystatechange',(event)=>{
    if(event.target.readyState==='complete'){
        initApp();
    }
})

function initApp(){
    //Add Listeners
    let addButton=document.getElementById('AddButton');
    addButton.onclick=()=>{processSubmissions();}
    let clearItems=document.getElementById('clearItems');
    clearItems.addEventListener('click',(event)=>{
        let list=toDoList.getList();
        if(list.length){
            let confirmed=confirm('Are you sure you wanna to clear hole list ?');
            if(confirmed){
                toDoList.clearList();
                updateData(toDoList.getList());
                refreshPage();   
            }
        }
        
    })
    //Procedurl
    loadListObject();
    refreshPage();
}

function loadListObject() {
    let storedList = localStorage.getItem('myToDoList');
    if (typeof storedList !== 'string') return;

    let parsed = JSON.parse(storedList);
    console.log("Parsed stored list:", parsed); // Debugging line

    parsed.forEach((itemData) => {
        let newToDoItem = new ToDoItem(); // Use the ToDoItem constructor
        newToDoItem.setId(itemData._id); // Set the id
        newToDoItem.setItem(itemData.item); // Use 'item' instead of '_item'
        console.log("Created ToDoItem:", newToDoItem); // Debugging line
        toDoList.addItemToList(newToDoItem); // Add to the list
    });
}




function refreshPage(){
 clearListDisplay();
 renderList();
 clearItemEntryField();
 setFocusOnItemEntry();   
}


const clearListDisplay=()=>{
    const parentElement=document.getElementById('listItems');
    deleteContents(parentElement);
}

function deleteContents(parentElement){
    let child=parentElement.lastElementChild;
    while(child){
        parentElement.removeChild(child);
        child=parentElement.lastElementChild;
    }
}

function renderList(){
    let list=toDoList.getList();
    list.forEach((item)=>{
        buildListItem(item); 
    })
}

function buildListItem(item){

    let div=document.createElement('div');
    div.className='item';
    let input=document.createElement('input');
    input.id=item.getId();;
    input.type='checkbox';
    let label=document.createElement('label');
    label.className='lead';
    input.tabIndex='0';
    label.htmlFor=item.getId();
    label.innerHTML=item.getItem();
    div.appendChild(input);
    div.appendChild(label);
    let container=document.getElementById('listItems');
    container.appendChild(div);
    addEventListenerToCheckBox(input);
    
    
}

function addEventListenerToCheckBox(check){
    check.addEventListener('click',()=>{
        toDoList.removeItemFromList(check.id);
        let removeText=getLabelText(check.id);
        updateData(toDoList.getList());
        setTimeout(()=>{
            refreshPage();
        },1000)
    })
}

function getLabelText(checkboxId){
    return document.getElementById(checkboxId).nextElementSibling.textContent;
}

function updateData(data){
    localStorage.setItem('myToDoList',JSON.stringify(data));
}

function clearItemEntryField(){
    document.getElementById('newItem').value='';
}

function setFocusOnItemEntry(){
    document.getElementById('newItem').focus();
}

function processSubmissions(){
    let newEntry=getNewEntry();
    if(!newEntry.length) return;
    let nextItemId=clacNextItemId();
    let toDoItem=createNewItem(nextItemId,newEntry);
    toDoList.addItemToList(toDoItem);
    updateData(toDoList.getList());
    refreshPage();
}

function getNewEntry(){
    return document.getElementById('newItem').value.trim();
}

function clacNextItemId(){
    let nextItem=1;
    let list=toDoList.getList();
    if(list.length>0){
        nextItem=list[list.length-1].getId()+1;
    }
    return nextItem;
}

function createNewItem(newId,newText){
    let toDo=new ToDoItem();
    toDo.setId(newId);
    toDo.setItem(newText);
    return toDo;
}


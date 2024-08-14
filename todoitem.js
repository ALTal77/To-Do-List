"use strict";
export default class ToDoItem{
    constructor(){
        this._id=null;
        this.item=null;
    }
    setItem(item){
        this.item=item;
    }
    setId(id){
        this._id=id;
    }
     getId(){
        return this._id;
    }
    getItem(){
        return this.item;
    }
    
}
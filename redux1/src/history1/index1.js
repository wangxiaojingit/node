import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

let state={
    title:{"color":"green","text":"title"},
    content:{"color":"yellow","text":"content"}
}

function renderTitle(){
    let title=document.getElementById("title");
    title.innerHTML=state.title.text;
    title.style.color=state.title.color;
}
function renderContent(){
    let content=document.getElementById("content");
    content.innerHTML=state.content.text;
    content.style.color=state.content.color;
}
function render(){
   renderTitle();
   renderContent();
}

render();
function dispatch(action){
    switch(action.type){
       case "CHANGE_TITLE_COLOR":
         state={...state,title:{...state.title,"color":action.color}};
         render();
       break;
       case "CHANGE_CONTENT_COLOR":
         state={...state,content:{...state.content,"color":action.color}};
         render();
       break
    }
}
window.setTimeout(function(){
    dispatch({"type":"CHANGE_TITLE_COLOR","color":"red"});
    dispatch({"type":"CHANGE_CONTENT_COLOR","color":"blue"})
},1000)
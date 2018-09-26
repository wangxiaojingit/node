import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// 为了保护state 不被别人乱修改,我们把它存放到一个函数.

function createstore(reducer){
    debugger;
    let state
    function dispatch(action){
       state= reducer(state, action);
       //render();
    }


    dispatch({type:"@init"});
    return {
        getstate:()=>{ return JSON.parse(JSON.stringify(state))}, //这里必须写成函数,每次取值的时候,执行函数,重新去拿state的值.
        dispatch
    }
}

let store=createstore(reducer);

//初始化状态值
let initstate={
    title:{"color":"green","text":"title"},
    content:{"color":"yellow","text":"content"}
}
//管理员
function reducer(state=initstate,action){
    console.log(initstate);
    switch(action.type){
        case "CHANGE_TITLE_COLOR":
          return {...state,title:{...state.title,"color":action.color}};
        break;
        case "CHANGE_CONTENT_COLOR":
         return {...state,content:{...state.content,"color":action.color}};
        break;
    }
    return state;
}

function renderTitle(){
    let title=document.getElementById("title");
    title.innerHTML=store.getstate().title.text;
    title.style.color=store.getstate().title.color;
}
function renderContent(){
    let content=document.getElementById("content");
    content.innerHTML=store.getstate().content.text;
    content.style.color=store.getstate().content.color;
}
function render(){
   renderTitle();
   renderContent();
}

render();

window.setTimeout(function(){
    store.dispatch({"type":"CHANGE_TITLE_COLOR","color":"red"});
    store.dispatch({"type":"CHANGE_CONTENT_COLOR","color":"blue"})
},1000)
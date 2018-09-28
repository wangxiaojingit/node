import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// 为了保护state 不被别人乱修改,我们把它存放到一个函数.

function createstore(reducer){
    let state,listen=[];
    function dispatch(action){
       state= reducer(state, action);
       //更改完状态之后,就开始执行更新函数
       listen.forEach((item)=>{
            item();
       })

    }
    dispatch({type:"@init"});
    //更新状态
    let subscribe=(fn)=>{
        listen.push(fn);
        return ()=>{
           listen= listen.filter(item=> item !=fn)
        }
    }
    
    return {
        getstate:()=>{ return JSON.parse(JSON.stringify(state))}, //这里必须写成函数,每次取值的时候,执行函数,重新去拿state的值.
        dispatch,
        subscribe
    }
}
//初始化状态值
let initstate={
    title:{"color":"green","text":"title"},
    content:{"color":"yellow","text":"content"}
}

let store=createstore(reducer);


//管理员
function reducer(state=initstate,action){
   
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
//状态发生改变,就更新
store.subscribe(render);
let unsubscribe=store.subscribe(function(){
    console.log("状态更新了!");
})
window.setTimeout(function(){
    store.dispatch({"type":"CHANGE_TITLE_COLOR","color":"red"});
   
   // render();
},1000);

window.setTimeout(function(){
    unsubscribe();
    store.dispatch({"type":"CHANGE_CONTENT_COLOR","color":"blue"});
    debugger;
   
   // render();
},2000)

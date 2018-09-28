import {createStore} from"redux";
//先把num的初始值渲染到页面上
let initState={
    num:0
}

function reduce(state=initState,action){
   switch(action.type){
         case "Add":
           return {...state,num:state.num+action.value};
         break;
         case "MINUS":
           return {...state,num:state.num-action.value};
         break;  
   }
   window.state=state;
   return state;
}


let store=createStore(reduce);
document.getElementById("box").innerHTML=store.getState().num;
//store.subscribe 多用来订阅事件
store.subscribe(()=>{
    document.getElementById("box").innerHTML=store.getState().num;
})
window.btn1.onclick=function(){
    //store.dispatch 多用来派发改变状态
   store.dispatch({type:"Add",value:1})
}

window.btn2.onclick=function(){
    store.dispatch({type:"MINUS",value:1})
}






function createState(reduce){
    debugger;
    let state,listen=[];
    //获取状态
    let getState=()=>JSON.parse(JSON.stringify(state));
    //更改状态
    function dispatch(action){
       state= reduce(state,action);
      
    }
    //更新函数
    function subscribe(fn){
      listen.push(fn);
    }
    dispatch({type:"@initType"})
    return {
        getState,
        dispatch
    }
}
//初始化状态值
let initstate={
    title:{"color":"red","content":"title"},
    content:{"color":"red","content":"content"}
}

function reduce(state=initstate,action){
    switch(action.type){
        case "CHANGE_TITLE_COLOR":
          return {...state,title:{...state.title,"color":action.COLOR}};
         
        break;
        case "CHANGE_CONTENT_COLOR":
          return {...state,content:{...state.content,"color":action.COLOR}};
        break;
    }
    return state;
}

let store=createState(reduce);

function renderTitle(){
    let title= document.getElementById("title");
    title.style.color=store.getState().title.color;
    title.innerHTML=store.getState().title.content;
}
function renderContent(){
    let content=document.getElementById("content");
    content.style.color=store.getState().content.color;
    content.innerHTML=store.getState().content.content;
 }


function render(){
   renderTitle();
   renderContent();
}
render();
//更新函数


window.setTimeout(function(){
    store.dispatch({type:"CHANGE_TITLE_COLOR","COLOR":"green"});
    render();
},1000)
window.setTimeout(function(){
    store.dispatch({type:"CHANGE_CONTENT_COLOR","COLOR":"blue"});
    render();
},1000)

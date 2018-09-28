//第一步:state 必须私有,不能被人随意改变,所以用函数装起来.

//第二步骤:改变state 的状态dispatch 要想操作state,也必须得放进去,因为getState 并不是原来的state.

//第三步骤:逻辑的部分必须得提取出去.不能封装死了.

//第四步骤:initState 就是初始化的state,reduce 是管理员,把更变的逻辑放进去.
// 把reduce 放到createState(reduce)中传进去,initState 通过reduce的默认参数传进去,
//在createStore 中,我们一进来就执行dispatch,让state等于默认的state值.

//第五步骤:渲染,store.subscribe就是执行渲染或者一些什么逻辑,这些逻辑每次触发dispatch,更改状态之后,就会触发store.subscribe里面的逻辑.

//sotre.subscribe 也可以有一个返回值,这个返回值可以取消此方法




function createStore(reduce){
    let state;
    let listen=[];
    let getState=()=>{return JSON.parse(JSON.stringify(state))};
    function dispatch(action){
       state= reduce(state,action);
       //只要执行了dispatch函数,我们就要更新
       listen.forEach(item=>item());
    }
    //渲染函数
    let subscribe=(fn)=>{
        listen.push(fn);
        return ()=>{
            listen=listen.filter((item)=>{
                return item!=fn;
            })
        }
    }
    dispatch({"type":"@initType"})
    return {
        getState,
        dispatch,
        subscribe
    }
}
//初始化state的值
let initState={
    title:{"color":"red","text":"title"},
    content:{"color":"red","text":"content"}
}
let store=createStore(reduce);
//改变状态的逻辑,放到管理员里面.
function reduce(state=initState,action){
    switch(action.type){
        case "CHANGE_TITLE_COLOR":
        return {...state,title:{...state.title,color:action.color}};
        break;
        case "CHANGE_CONTENT_COLOR":
        return {...state,content:{...state.content,color:action.color}};
        break;
     }
     return state;
}
function renderTitle(){
  let title=document.getElementById("title");
  title.innerHTML=store.getState().title.text;
  title.style.color=store.getState().title.color;
}

function renderContent(){
   let content=document.getElementById("content");
   content.innerHTML=store.getState().content.text;
   content.style.color=store.getState().content.color;
}
function render(){
    renderTitle();
    renderContent();
}

render();
store.subscribe(render);
let unupdate=store.subscribe(function(){
    console.log("更新完毕!")
});

window.setTimeout(function(){
    store.dispatch({"type":"CHANGE_TITLE_COLOR","color":"green"});
    store.dispatch({"type":"CHANGE_CONTENT_COLOR","color":"green"});
    unupdate();//卸载更新完毕事件,可以发现在后面的一个dispatch里面就不会出现打印"更新完毕".(总共出现2次,最后一个不触发)
},1000)

window.setTimeout(function(){
    store.dispatch({"type":"CHANGE_TITLE_COLOR","color":"blue"});
},2000)
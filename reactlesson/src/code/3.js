/**
 * 写一个钟表组件
 * 写成函数形式的组件,存在的缺陷:
 * 1:没this
 * 2:函数没有自己的状态
 * 3:没有生命周期
 * 
 */
import React from "react";
import ReactDom,{Component} from "react-dom";

function Clock(props){
    console.log(props.data);
    console.log(this);
    return <h1>{props.data}</h1>
}

setInterval(function(){
    let str=(<div>
             <Clock data={new Date().toLocaleString()}></Clock>
         </div>)
    ReactDom.render(str,window.root)
},1000)
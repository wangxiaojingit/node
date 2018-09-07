/**
 * 写一个类组件钟表,弥补函数的不足:
 * 1 有自己的状态
 * 2 有this
 * 3 有自己的生命周期
 * 
 * 
 */

 import React from "react";
 import ReactDom from "react-dom";

 class Clock extends React.Component{
     constructor(props){
         super();
         this.state={date:new Date().toLocaleString()}
     }
     componentDidMount(){ //组件挂载完成
        setInterval(()=>{
            this.setState({date:new Date().toLocaleString()})
        },1000)
     }
     render(){ //每个类组件都有一个自己的渲染函数
        return (<React.Fragment>
           {this.state.date}-- {this.props.time}
        </React.Fragment>)
     }
        
 }

 ReactDom.render(<Clock time='123'></Clock>,window.root)

/**
 * 非受控,可以直接操作dom
 * 
 * 方法有两种: 
 * 1 ref={(dom)=>{this.a=dom}} //dom 就是当前的dom元素,this.a=dom,把dom绑定到了当前实例属性上,在操作dom的时候只用this.a
 * 2 ref={this.b}  b=React.createRef();在获取dom的时候,this.b.current 即可获取
 * 
 * 
 */

 import React,{Component} from "react";
 import ReactDom ,{render}from "react-dom";
 

  class Uncontrol extends Component{
      constructor(){
          super()
      }
      b=React.createRef();
      clickHandle=()=>{
          alert(this.a.value);
          alert(this.b.current.value);
      }
      render(){
          return (<div>
              <input type="text" name="a" ref={(dom)=>{this.a=dom}}/>
              <input type="text" name="b" ref={this.b}/>
              <button onClick={this.clickHandle}>点击</button>
          </div>)
      }
  }

 render(<Uncontrol></Uncontrol>,window.root)
/**
 * 
 * 受控组件,主要是绑定状态,不再操作dom
 * 
 * 把input 的值绑定到状态上,然后配合onChange函数一起使用,如果发生输入框改变的事件,我们就重新更新状态的值
 * 
 */

 import React, {Component}from "react";
 import ReactDom,{render}from "react-dom"


 class Control extends Component{
      state={
          a:"hello",
          b:"world"
      }
      handdle=(e)=>{
            alert(this.state.a);
            alert(this.state.b);
      }
      changeHanddle=(e)=>{
        let val=e.target.name;
        this.setState({
            [val]:e.target.value
        })
      }
      render(){
          return (
              <div>
                  <input type="text" name="a" value={this.state.a} onChange={this.changeHanddle} />
                  <input type="text" name="b" value={this.state.b} onChange={this.changeHanddle}/>
                  <button onClick={this.handdle}>点击</button>
              </div>
          )
      }
 }

 render(<Control></Control>,window.root)
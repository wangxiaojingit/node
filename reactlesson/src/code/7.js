/**
 * 
 * react 的生命周期:
 * 正常的顺序:constructor--componentWillMount--render----componentDidMount
 * 当点击增加改变属性的时候:
 * shouldComponentUpdate(是否要更新)---componentWillUpdate(组件将要更新)---render
 * 
 * 当父组件中嵌套子组件的时候,是先开始渲染父组件,在渲染的时候发现子组件,就开始渲染子组件,等子组件
 * 完成一系列组件的时候,父组件接着后面的顺序.
 * 
 * 
 * 
 */

 import React from"react";
 import ReactDom from "react-dom"
 class Child extends React.Component{
      constructor(props){
        super();
      }
      //这个方法目前要呗废弃了
      componentWillReceiveProps(newProps){
           //接收新的属性的时候,会走到这个钩子函数,第一次接收属性的时候不会进来.即使第二次属性值
           //一样,但是也会进来.
           console.log("componentWillReceiveProps");
           console.log(newProps)
      }
      componentWillMount(){
          console.log("child-componentWillMount");
      }
      render(){
          console.log("child-render");
          return <div>{this.props.num}</div>
      }
      componentDidMount(){
          console.log("child-componentDidMount");
      }
      shouldComponentUpdate(){
          console.log("child-shouldComponentUpdate");
          return true;
      }
      componentWillUpdate(){
          console.log("child-componentWillUpdate")
      }
      componentDidUpdate(){
        console.log("child-componentDidUpdate")
      }
 }
 class Parent extends React.Component{
     constructor(props){
         super();
         this.state={num:1};
         console.log("constructor")
     }
     //这个将要被废弃
     componentWillMount(){
         console.log("componentWillMount")
     }
     render(){
         console.log("render");
         return (<div>{this.state.num}
           <button onClick={()=>{this.setState({num:this.state.num})}}>+</button>
           <Child num={this.state.num}></Child>
         </div>)
     }
     componentDidMount(){
         //组件完成挂载
         console.log("---componentDidMount")
     }
     shouldComponentUpdate(nextProps,nextState){
        //是否要更新
        console.log("shouldComponentUpdate");
        return true;
     }
     componentWillUpdate(){
         //组件将要更新
         console.log("componentWillUpdate");
     }
     componentDidUpdate(){
         console.log("componentDidUpdate");
     }
    


 }

 ReactDom.render(<Parent ></Parent>,window.root)
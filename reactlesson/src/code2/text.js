/**
 * 
 * 练习一下受控组件和非受控组件
 * 
 */

 import React,{Component} from "react";
 import ReactDom,{render} from "react-dom";
 // 1-----------非受控
//  class Uncontrol extends Component{
//      clickHandler=()=>{
//            alert(this.a.value) ;
//            alert(this.b.current.value);
//      }
//      b=React.createRef();
//      render(){
//          return (
//              <div>
//                  <input type="text" name="a"  ref={(dom)=>this.a=dom}/>
//                  <input type="text"  name="b" ref={this.b} />
//                  <button onClick={this.clickHandler}>click</button>
//              </div>
//          )
//      }
//  }
//render(<Uncontrol></Uncontrol>,window.root)

//2------------受控

class Control extends Component{
    state={
        a:"hello",
        b:"word"
    }
    changeHandler=(e)=>{
       let val= e.target.name;
       console.log(e.target.value);
       this.setState({
        [val]:e.target.value
       })
       console.log(this.state.a)
       
    }
    clickHandler=(e)=>{
        alert(this.state.a);
        alert(this.state.b);
    }
    render(){
        return (<div>
                 <input type="text" name="a" value={this.state.a}  onChange={this.changeHandler}/>
                 <input type="text" name="b" value={this.state.b}  onChange={this.changeHandler} />
                 <button onClick={this.clickHandler}>click</button>
        </div>)
    }
}

render(<Control></Control>,window.root)
 
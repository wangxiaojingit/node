/**
 * 1\绑定点击事件,用onClick(原生是onclick,注意大小写)
 * 2\绑定事件的时候,this问题,可以使用箭头函数
 * 3\setState() 如果同级多次使用,不会效果累加,可以使用回调
 * 或者setState((preState)=>{
 *    return {num:preState+2}
 * })
 * 
 * ReactDom.unmountComponentAtNode(window.root);
 * 4\ 卸载组件的方法:ReactDom.unmountComponentAtNode(window.root);
 *                                                         
 * 5\ 卸载完组件之后,如果有定时器,或者类似的需要清除的代码需要在componentWillUnmount中处理下
 *
 * 
 */

 import React from "react";
 import ReactDom from "react-dom";
//1-----------------------------
//  class App extends React.Component{
//      constructor(props){
//         super();
//         this.state={num:1}
//      }
//      componentDidMount(){

//      }
//      fn(){
//          console.log(this);//发现这里的this 是undefined 解决方案看下
//      }
//      render(){
//          return (<div>
//             {this.state.num}<button onClick={this.fn}>+</button>
//          </div>)
//      }
//  }

//  ReactDom.render(<App></App>,window.root)


 //2 解决this问题,bind方法-------------------------------------
 
//  class App extends React.Component{
//     constructor(props){
//        super();
//        this.state={num:1};
//        this.fn=this.fn.bind(this)
//     }
//     componentDidMount(){

//     }
//     fn(){
//        // console.log(this);//发现这里的this 是undefined 解决方案看下
        
//         this.setState({num:this.state.num+1});
       
//     }
//     render(){
//         return (<div>
//            {this.state.num}<button onClick={this.fn}>+</button>
//         </div>)
//     }
// }

// ReactDom.render(<App></App>,window.root)

//3------直接用箭头函数 推荐的使用方法
// class App extends React.Component{
//     constructor(props){
//        super();
//        this.state={num:1};
      
//     }
//     componentDidMount(){

//     }
//     fn=()=>{
//        // console.log(this);//发现这里的this 是undefined 解决方案看下
//         //setState 
//         this.setState({num:this.state.num+1});
//     }
//     render(){
//         return (<div>
//            {this.state.num}<button onClick={this.fn}>+</button>
//         </div>)
//     }
// }

// ReactDom.render(<App></App>,window.root)
//4----设置多个setState
// class App extends React.Component{
//     constructor(props){
//        super();
//        this.state={num:1};
      
//     }
//     componentDidMount(){

//     }
//     fn=()=>{
//         /**
//          *1\当这样同级批量设置setState的时候,只会认一个有效,不会累加
//          *this.setState({num:this.state.num+1});
//          *this.setState({num:this.state.num+1});
//          *this.setState({num:this.state.num+1});
//          */
//         //2\写成回调的形式,可以累加,下面的代码相当于一次累加三
//         // this.setState({num:this.state.num+1},()=>{
//         //     this.setState({num:this.state.num+1},()=>{
//         //         this.setState({num:this.state.num+1})
//         //     })
//         // })
//         /**
//          * 3,针对2可以达到多次累加的效果,但是代码比较累赘,可以写成下面的
//          * 
//          * 
//          */
//         this.setState((preState)=>{
//            return {num:preState.num+3}
//         })
//     }
//     render(){
//         return (<div>
//            {this.state.num}<button onClick={this.fn}>+</button>
           
//         </div>)
//     }
// }

// ReactDom.render(<App></App>,window.root)

//5--------------移除方法
class App extends React.Component{
    constructor(){
        super();
        this.state={num:1};
    }
    componentDidMount(){

    }
    
    
    fn=()=>{
      this.timer=  setInterval(()=>{
            this.setState({num:this.state.num+1})
        },1000)
        
    }
    componentWillUnmount(){
        //在卸载完组件之后,记得要清除掉定时器.
        clearInterval(this.timer)
    }
    remove=()=>{
        //卸载组件
      ReactDom.unmountComponentAtNode(window.root);
        
    }
    render(){  
       return <React.Fragment>
           {this.state.num}<button onClick={this.fn}>+</button>
           <button onClick={this.remove}>移除</button>
       </React.Fragment>
    }
}

ReactDom.render(<App></App>,window.root)
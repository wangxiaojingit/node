import React from 'react'
import ReactDom from 'react-dom'
/**
 * 1 calss-----className
 * 2 style-----{color:'green'}
 * 3 dangerouslySetInnerHTML 可以把字符串渲染成html 相当于innerHTML
 * 4 {} 代表一个js执行环境,里面可以放函数,如果取值的时候,必须return
 * 5 {} .....还可以放三元运算符
 */

//1-------------------------------
        // let str1="<div>123</div>";
        // let flag=true;
        // let str=(<div>
        //     <h1 className='red'>hello react</h1>
        //     <div className="box" style={{color:'green'}}>box</div>
        //     <div dangerouslySetInnerHTML={{__html:str1}}></div>
        //     <div>{(()=>123+'fn')()}</div>
        //     <div>{flag?'123':null}</div>
        //     </div>)

        // ReactDom.render(str,window.root);

//2--------------------------------遍历数组
            // let ary=["1","2","3"];

            // let str3=ary.map((item,key)=>{
            //     return <li key={key}>{item}</li>
            
            // });
            // console.log(str3)

            // ReactDom.render(str3,window.root);

//3----------------------写一个基本的钟表组件
    //函数形式的钟表组件,缺点:1没有this  2:没有自己的状态 3:没有生命周期
    // function Clock(props){
    //     return <div>{props.date}-----</div>
    // }
    // setInterval(function(){
    //     ReactDom.render(<Clock date={new Date().toLocaleString()}></Clock>,window.root)
    // },1000)   
//4-----------------------写一个类钟表组件

//    class Clock extends React.Component{
//           constructor(props){
//              super()
//              this.state={date:new Date().toLocaleString()}
//              console.log("props.time:"+props.time); 
//              /**之前在这里加入了console.log(this.props.time)造成代码错误,如果想要这么使用
//               * 得在super(props)
//              **/ 
//           }
//           componentDidMount(){
//              setInterval(()=>{
//                  this.setState({date:new Date().toLocaleString()})
//              },1000)
//           }
//           render(){
//             return (<React.Fragment>
//                 {this.state.date}----{this.props.time}
//             </React.Fragment>)
//           }
//    }
  
//    ReactDom.render(<Clock time='123'></Clock>,window.root)
  

//默认属性和校验

// import PropTypes from "prop-types";
// class Person extends React.Component{
//     constructor(props){
//         super();
//         console.log(props.name)
//     }
//     static defaultProps={
//         school:'it school'
//     }
//     static propTypes={
//         name:PropTypes.string,
//         age:PropTypes.number,
//         engen:PropTypes.oneOf(["男","女"]),
//         hobby:PropTypes.arrayOf(PropTypes.string),
//         pos:PropTypes.shape({
//             x:PropTypes.number,
//             y:PropTypes.number
//         })
//     }
//     componentDidMount(){

//     }
//     render(){
          
//           return (<React.Fragment>
//               {this.props.name}--{this.props.age}
//           </React.Fragment>)
//     }
// }

// let obj={
//     name:'wxj',
//     age:18,
//     hobby:["羽毛球","跑步","音乐"],
//     engen:"女",
//     pos:{
//         x:22,
//         y:11
//     }
// }

// ReactDom.render(<Person {...obj}></Person>,window.root);



//-----校验
import PropTypes from "prop-types"
class Person extends React.Component{
    constructor(props){
        super();
    }
    static propTypes={
        name:PropTypes.string,
        age:PropTypes.number,
        hobby:PropTypes.arrayOf(PropTypes.string),
        gender:PropTypes.oneOf(["男","女"]),
        salay(obj,key){
            //写成函数的时候,就是自己校验
            if(obj[key]>=30000){
               throw new Error("你的工资真高!")
            }
           
        }
    }
    static defaultProps={
        school:'mp'
    }

    render(){
        return <div>{this.props.name}---{this.props.school}</div>
    }
}

let obj={
    name:"zf",
    age:18,
    hobby:["羽毛球","跑步","音乐"],
    salay:30000,
    gender:"男",
    
}


ReactDom.render(<Person {...obj}></Person>,window.root)










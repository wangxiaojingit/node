import React from "react";
import ReactDom from "react-dom";
import PropTypes from "prop-types"
/***
 * 校验
 * 
 * 
 * 
 */
 class Person extends React.Component{
     constructor(props){
         super();
     }   
     //校验属于的类型
     static propTypes={
         name:PropTypes.string,
         age:PropTypes.number.isRequired,
         gender:PropTypes.oneOf(["男","女"]),
         hobby:PropTypes.arrayOf(PropTypes.string),
         pos:PropTypes.shape({
             x:PropTypes.number,
             y:PropTypes.number
         }),
         drank:PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number
         ])
     }
     //默认的属性,如果这个属性在组件中没有传,就默认这个属性值   
     static defaultProps={
         name:'荣盛祝福花语',
         age:1,
        // gender:"女",
         
         
     }
     
     componentDidMount(){

     }
     render(){
        return <React.Fragment>
            {this.props.name}---{this.props.age}----{this.props.drank}
        </React.Fragment>
     }
 }
 let obj={
     name:"amu",
     age:18,
     gender:"女",
     hobby:["羽毛球","跑步","音乐"],
         pos:{
             x:11,
             y:33
     },
     drank:22

 }
 ReactDom.render(<Person {...obj}></Person>,window.root)
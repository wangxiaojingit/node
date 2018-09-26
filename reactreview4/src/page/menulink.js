import React,{Component} from"react";
import ReactDom,{render} from"react-dom";
import {Link,Route} from "react-router-dom";

export default class menulink extends Component{
     render(){
         return ( <Route path={this.props.to} children={(props)=>{
             let match=props.match;
             return <li role="presentation" className={match?"active":""}><Link to={this.props.to} >{this.props.children}</Link></li> 
         }}></Route>)
         
        
         
     }
}


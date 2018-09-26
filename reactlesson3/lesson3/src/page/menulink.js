import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";
import {Link,Route} from "react-router-dom";

export default class MenuLink extends Component{
    render(){
       
        return (
           <Route  path={this.props.to} children={(props)=>{
               console.log(props)
               return (<li role="presentation" className={props.match?"active":""}>
              
               { <Link to={this.props.to}>{this.props.children}</Link> }
           </li>)
           }}>
                
           </Route>
       )
    }
}
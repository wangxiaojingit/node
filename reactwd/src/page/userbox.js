import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";
import {Link,Route} from "react-router-dom";

import Add from"./add";
import List from "./list";
export default class Userbox extends Component {
    render(){                           
        return (<Route path={this.props.to} children={(obj)=>{
              console.log(obj);
              let match=obj.match;
              
              return <li role="presentation" className={match?"red":""} ><Link to={this.props.to}>{this.props.children}</Link></li>
        }}>
            
        </Route>)
    }
}
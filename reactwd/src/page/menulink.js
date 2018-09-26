import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";
import {Route,Link} from "react-router-dom";

export default class Menulink extends Component {

    render(){
        return ( <Route path={this.props.to} children={(obj)=>{
            let match=obj.match;
            return  <li role="presentation" className={match?"active":""}><Link to={this.props.to}>{this.props.children}</Link></li>
        }} >
           
        </Route>)
    }
}
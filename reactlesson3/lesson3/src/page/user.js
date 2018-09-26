import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";

import List from "./list"
import Add from "./add"
import {HashRouter as Router,Route,Link,Switch} from "react-router-dom";
import Detail from "./detail.js"
export default class User extends Component{
    render(){
        return (<div className="row">
            <div className="col-md-3">
               <div className="nav nav-stacked">
                 <li> <Link to="/user/add">添加用户</Link></li>
                 <li> <Link to="/user/list">用户列表</Link></li>
               </div>
            </div>
            <div className="col-md-9">
               <Switch>
                 <Route path="/user/add"  component={Add}/> 
                 <Route path="/user/list" component={List}/>
                 <Route path="/user/detail/:id" component={Detail}/>
               </Switch>
            </div>
            
        </div>)
    }
}
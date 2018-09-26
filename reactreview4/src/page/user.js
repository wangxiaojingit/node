import React,{Component} from"react";
import ReactDom,{render} from"react-dom";
import {Route,Link,Switch} from"react-router-dom";
import Userlist from "./userlist.js";
import Adduser from "./adduser.js";
import Detail from "./detail.js";
//用户列表
export default class user extends Component{
     
     render(){
         return (
             <div>
                 <div class="container-fluid">
                   <div class="row">
                     <div class="col-md-4">
                            <ul class="nav nav-pills nav-stacked">
                                <li><Link to="/user/adduser">添加用户</Link></li>
                                <li><Link to="/user/userlist">用户列表</Link> </li>
                            </ul>
                     </div>
                     <div class="col-md-8">
                     <Switch>
                        <Route path="/user/adduser" component={Adduser}></Route>
                        <Route path="/user/userlist" component={Userlist}></Route>
                        <Route path="/user/detail/:id" component={Detail}></Route>
                     </Switch>
                     </div>
                   </div>
                 </div>
               
                <div>
                </div>
             </div>
             
                
            )
     }
}
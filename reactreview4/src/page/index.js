import React,{Component} from"react";
import ReactDom,{render} from"react-dom";
import {Link} from "react-router-dom";
import Menulink from "./menulink.js";

export default class Index extends Component{
     render(){
         return (
           <div>
           <ul class="nav nav-pills">
               <Menulink to="/home">主页</Menulink>
               <Menulink to="/user">用户</Menulink>
               <Menulink to="/center">个人中心</Menulink>
               <Menulink to="/admin" >用户管理</Menulink>

                {/* <li > <Link to="/home" >主页</Link></li>
                <li role="presentation"><Link to="/user" >用户</Link></li>
                <li role="presentation"><Link to="/center" >个人中心</Link></li>
                <li role="presentation"><Link to="/admin">用户管理</Link>   </li> */}
          </ul>
           {this.props.children} 
          </div>
           
         ) 
         
         
     }
}
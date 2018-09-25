import React,{Component} from"react";
import ReactDom,{render} from"react-dom";
import {Link} from "react-router-dom";

export default class Index extends Component{
     render(){
         return (
           <div>
           <ul class="nav nav-pills">
                <li role="presentation" class="active"> <Link to="/home" >主页</Link></li>
                <li role="presentation"><Link to="/user" >用户</Link></li>
                <li role="presentation"><Link to="/center" >个人中心</Link></li>
                <li role="presentation"><Link to="/admin">用户管理</Link>   </li>
          </ul>
           {this.props.children} 
          </div>
           
         ) 
         
         
     }
}
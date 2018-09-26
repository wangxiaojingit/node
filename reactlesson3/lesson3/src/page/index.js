
import React,{Component} from "react";
import ReactDom,{render} from "react-dom";
import {Link} from "react-router-dom";
import Log from "./log";
import MenuLink from "./menulink";
//负责导航的文件
export default class Index extends Component{
    render(){
        return (<div className="container-fluid">
                  <div className="navbar-header">
                   <Log className="navbar-brand" ></Log>
                  </div>
                    <ul className="nav nav-pills ">
                     <MenuLink to="/home">首页</MenuLink>
                     <MenuLink to="/user">用户</MenuLink>
                     <MenuLink to="/center">个人中心</MenuLink>

                        {/* <li role="presentation" >
                           <Link  to="/home">首页</Link>
                        </li>
                        <li  role="presentation">
                           <Link  to="/user">用户</Link>
                        </li>
                        <li role="presentation"  >
                            <Link to="/center">个人中心</Link>
                        </li> */}
                    </ul>
                    <div>{this.props.children}</div>
               </div>)
    }
}


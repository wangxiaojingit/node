import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";
import {Link,Route} from "react-router-dom";
import Menulink from "./menulink"
export default class Index extends Component {

    render(){
        return (<div>
            <ul class="nav nav-pills">
            <Menulink to="/home">首页</Menulink>
            <Menulink to="/user">用户</Menulink>
            <Menulink to="/center">个人中心</Menulink>
            <Menulink to="/admin">管理</Menulink>

              {/* <li role="presentation" class="active"><Link to="/home">首页</Link></li>
              <li role="presentation"><Link  to="/user">用户</Link></li>
              <li role="presentation"><Link  to="/center">个人中心</Link></li>
              <li role="presentation"><Link  to="/admin">管理</Link></li> */}
            </ul>
            <div>
               {this.props.children}
            </div>
        </div>)
    }
}
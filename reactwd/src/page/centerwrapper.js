import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";
import {Route,Redirect} from "react-router-dom";
//如果登录了,我们就渲染这个个人中心,如果没有登录重定向到管理中心
export default class Centerwrapper extends Component {
    render(){
        let login=localStorage.getItem("login");
        return login?<Route {...this.props}></Route>:<Redirect to={{pathname:"/admin",state:{from:"/center"}}}></Redirect>
    }
}
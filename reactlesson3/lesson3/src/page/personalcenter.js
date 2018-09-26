import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";
import {Route,Redirect} from "react-router-dom";
//这个组件是自定义组件,为了拦截,看是否登录,如果登录了,我们就让它走正常路由,跳到个人中心,如果没登录,就去跳转到登录

export default class Home extends Component{
    render(){
      
         let log=localStorage.getItem("login");
      
        return log?<Route {...this.props}></Route>:<Redirect to={{pathname:'/login',state:{from:'/center'}}}/>
       
       
        
            
        
    }
}
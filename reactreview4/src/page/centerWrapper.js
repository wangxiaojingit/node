import React,{Component} from"react";
import ReactDom,{render} from"react-dom";
import {Route,Redirect} from "react-router-dom";
export default class CenterWrapper extends Component{
     render(){
         let login=localStorage.getItem("login");
         console.log(this.props)
         return login?<Route {...this.props}></Route>:<Redirect to="/admin"></Redirect>;
        // return login?<Route {...this.props}></Route>:<Redirect to={{pathname:"/login",state:{"from":'/profile'}}}/>
     }
}
import React,{Component} from"react";
import ReactDom,{render} from"react-dom";
import {Route,Redirect} from "react-router-dom";
import Center from "./center.js"
export default class CenterWrapper extends Component{
     render(){
         let login=localStorage.getItem("login");
        
         return login?<Route {...this.props}></Route>:<Redirect to={{pathname:"/admin",state:{"from":"/center"}}} ></Redirect>;
       
     }
}
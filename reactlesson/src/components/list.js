import React,{Component} from "react";
import ReactDom,{render} from "react-dom";
import Itemlist from "./itemlist.js";
import {Consumer} from "../context.js";
export default class List extends Component{
    
    render(){
        return (
            
        <div>
            {this.props.users.map((item,key)=>{
             return <Itemlist {...item} key={key}  removeuser={this.props.removeuser} ></Itemlist>
           })}
        </div>
        )
    }
}


//avatar={avatar} username={username} content={content}
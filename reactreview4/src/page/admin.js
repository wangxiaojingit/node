import React,{Component} from"react";
import ReactDom,{render} from"react-dom"
//用户中心
export default class admin extends Component{
    loginfn=()=>{
        alert(1);
        localStorage.setItem("login","login");
    }
    exit=()=>{
        localStorage.removeItem("login","login");
    }
     render(){
       
         return <div >
             <button className="btn btn-info" onClick={this.loginfn}>登录</button>
             <button className="btn btn-info" onClick={this.exit}>退出</button>
         </div>
     }
}
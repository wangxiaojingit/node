import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";

export default class Admin extends Component {
    loginfn=()=>{
        localStorage.setItem("login","ok");
        if(this.props.location.state&&this.props.location.state.from){
            this.props.history.push(this.props.location.state.from);
        }
        
    }
    exitfn=()=>{
        localStorage.removeItem("login");
    }
    render(){
        console.log(this.props)
        return <div>
            <button className="btn btn-info " onClick={this.loginfn}>登录</button>
            <button className="btn btn-danger" onClick={this.exitfn}>退出</button>
        </div>
    }
}
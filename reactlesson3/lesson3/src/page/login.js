import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";


export default class Login extends Component{
    loginhanddle=()=>{
       
        
        //登录成功之后跳转到个人中心
        if(localStorage.setItem("login","ok")){
            this.props.history.push(this.props.location.state.from)
        }else{
            this.props.history.push("/")
        }
        
    }
    signouthanddle=()=>{
        localStorage.removeItem("login");
    }
    render(){
        return (<div >
             <button className="btn btn-info" style={{marginRight:'10px'}} onClick={this.loginhanddle}>登录</button>
             <button className="btn btn-info" onClick={this.signouthanddle}>退出</button>
        </div>)
    }
}

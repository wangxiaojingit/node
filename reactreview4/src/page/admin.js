import React,{Component} from"react";
import ReactDom,{render} from"react-dom"
//用户中心
export default class admin extends Component{
    loginfn=()=>{
       

        localStorage.setItem("login","login");
       
        //如果是从用户中心跳过来的,我们就让登录完毕之后去跳转到个人中心
        if(this.props.location.state&&this.props.location.state.from){
            let from=this.props.location.state.from;
            this.props.history.push(from);
        }else{
            this.props.history("/");
        }
       
    }
    exit=()=>{
        localStorage.removeItem("login");
    }
     render(){
        console.log(this.props)
         return <div style={{"marginTop":"10px"}} >
             <button className="btn btn-info" style={{"marginRight":"10px"}} onClick={this.loginfn}>登录</button>
             <button className="btn btn-info" onClick={this.exit}>退出</button>
         </div>
     }
}
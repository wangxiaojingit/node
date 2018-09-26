import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";
import {withRouter} from "react-router-dom"

 class Log extends Component{
    change=()=>{
        this.props.history.push("/login")
    }
    render(){
        return (<div onClick={this.change} style={{height:'40px',lineHeight:'40px',marginRight:'10px'}}>
            用户管理中心
        </div>)
    }
}

export default withRouter(Log)
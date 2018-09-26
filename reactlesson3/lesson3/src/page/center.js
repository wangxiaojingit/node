import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";

//在登录个人中心的时候,需要校验,如果登录过了,才能进到个人中心里面,如果没有登录过,就需要跳转到登录页面
export default class Center extends Component{
    render(){
        return <div>
           个人中心
        </div>
    }
}
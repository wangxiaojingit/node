import React,{Component} from"react";
import ReactDom,{render} from"react-dom";
import {Route,Link} from"react-router-dom"
//用户列表
export default class Adduser extends Component{
   
    refName=React.createRef();
    //refPas= React.createRef();
    subHanddle=(e)=>{
        //阻止默认事件的跳转.
        e.preventDefault();
        //把值存放起来
        let username=this.refName.current.value;
       // let pas=this.refPas.current.value;
        let lists=localStorage.getItem("lists");
        lists=JSON.parse(lists)||[];
        lists.push({id:lists.length+1,username:this.refName.current.value});
        localStorage.setItem("lists",JSON.stringify(lists));
        this.props.history.push('/user/userlist');

       
       
    }
     render(){
         return (
             <div>
                <form onSubmit={this.subHanddle}>
                    <div>
                        <span  htmlFor="user">用户名:</span>
                        <input id="user" className="form-control" type="text" required ref={this.refName}/> 
                    </div>
                   
                   <div style={{"marginTop":"10px"}}><input className="form-control btn btn-info " type="submit" value="提交"/></div>
                </form> 
                
             </div>
             
                
            )
     }
}
import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";


export default class Add extends Component{
    submitHandle=(e)=>{
        e.preventDefault();
        let name=this.input.current.value;
        let list= JSON.parse(localStorage.getItem("list"))||[];
        let obj={id:list.length+1,name};
        list.push(obj);
        localStorage.setItem("list",JSON.stringify(list));
        //点击提交的时候,跳转到list页面
        this.props.history.push("/user/list");
    }
    input=React.createRef();
    render(){
        return (<div>
            <form onSubmit={this.submitHandle}>
                <div className="form-group">
                  <label htmlFor="userName">用户名:</label>
                  <input  type="text" id="userName" className="form-control" ref={this.input}/>
                </div>
                <div className="form-group">
                   <input type="submit" className="form-control btn btn-info"/>
                </div>
            </form>
               
        </div>)
    }
}
import React,{Component} from "react";
import ReactDom from "react-dom";

export default class Comment extends Component{
    
    content=React.createRef();
    submitHandle=(e)=>{
      //点击提交评论
      e.preventDefault();
      this.props.adduser(this.content.current.value);
    }
    render(){
        return (
            <form onSubmit={this.submitHandle}>
                                <textarea className="form-control" ref={this.content} required></textarea>
                                <button type="submit" className="btn btn-info">提交</button>
            </form>
        )
    }
}
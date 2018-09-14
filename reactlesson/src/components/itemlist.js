import React,{Component} from "react";
import ReactDom,{render} from "react-dom";
import {Consumer} from "../context.js";
export default class Itemlist extends Component{
    removeHandler=(id)=>{
        console.log(id)
        this.props.removeuser(id)
    }
    dianzan=()=>{
        this.props.increace();
    }
    
    render(){
        
        return (
            <Consumer>
                {
                    (value)=>{
                        return <div>
                        <div className="media">
                        <div className="media-left">
                            <div className="media-object">
                                <img src={this.props.avatar} />
                            </div>
                        </div>
                        <div className="media-body">
                            <h4 className="media-heading">{this.props.username}</h4>
                            <h4 className="media-heading">{this.props.content}</h4>
                            <button className="btn btn-danger" onClick={this.removeHandler.bind(null,this.props.id)}>删除</button>
                            <button className="btn btn-info" onClick={()=>{value.increace()}}>点赞</button>
                        </div>
                        </div>
                   </div>
                    }
                }
            </Consumer>
                            
        )
    }
}


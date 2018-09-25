import React,{Component} from"react";
import ReactDom,{render} from"react-dom"

export default class home extends Component{
    state={
       user:{}
    }
    componentWillMount(){
        let s=this.props.location.state;
        console.log(this.props)
        if(s){
           //说明是从用户列表点进来的
           this.setState({
            user:s
           })
        }else{
            let lists=JSON.parse(localStorage.getItem("lists"));
            let user=lists.find((item)=>{
                return item.id==this.props.match.params.id
            })||{};

            this.setState({
                user
            })
        }
        
    }
     
     render(){
         return (<div>
                
                 {this.state.user.id ? <div>{this.state.user.id} </div>:null}   
             </div>)
     }
}
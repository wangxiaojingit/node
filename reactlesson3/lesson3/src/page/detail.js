import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";


export default class Detail extends Component{
    state={
        user:{}
    }
    componentWillMount(){
         // console.log(this.props)
         let s= this.props.location.state;
         if(!s){
            
            let user=JSON.parse(localStorage.getItem("list"));
            let user2=user.find((item)=>{
               return item.id==this.props.match.params.id
            })||{}
            
            this.setState({user:user2})
            console.log(this.state.user)
         }else{
          //有值,说明是通过点击过来的
          
          this.setState({
              user:s
          })
       }
    }
    render(){
      
        
       // console.log(this.props.match.params.id)
        return (<div>
            Detail
            <div>{this.state.user.name}</div>
            <div>{this.state.user.id}</div>
        </div>)
    }
}
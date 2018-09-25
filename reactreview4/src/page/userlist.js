import React,{Component} from"react";
import ReactDom,{render} from"react-dom";
import {Route,Link} from"react-router-dom"
//用户列表
export default class Userlist extends Component{
    state={
        lists:[]
    }
    componentWillMount(){
       var lists=JSON.parse(localStorage.getItem("lists"))||[];
       this.setState({
           lists
       })
    }
     render(){
         return (
             <div>
                 <table class="table table-striped">
                   <thead>
                       <tr>
                           <th>id:</th>
                           <th>用户名:</th>
                       </tr>
                   </thead>
                   <tbody>
                   {
                     
                     this.state.lists.map(function(item){
                            return (
                                <tr>
                                    <td>{item.id}</td>
                                    <td><Link to={{pathname:"/user/detail/"+item.id,state:item}}>{item.username}</Link></td>
                                    
                                </tr> 
                            ) 
                     })
                
                
                
                   }
                    
                      
                   </tbody>
                 </table>
                
             </div>
             
                
            )
     }
}

var list=[1,2];

var list2=list.map((item)=>{
    "<div>1111_+item</div>"
})
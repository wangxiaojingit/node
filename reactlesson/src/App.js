import React,{Component}from "react";
import ReactDom,{render} from "react-dom";
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css'

// axios.interceptors.request.use(function(config){
//       config.headers.a=1;
//       return config
    
// })
axios.interceptors.response.use(function(res){
    console.log(2)
    console.log(res)
    console.log(3)
//    if(res.code==0){
//       return res.data.users;
//    }
  
})
export default class App extends Component{
    async componentDidMount(){
        console.log(4)
        let res=await axios.get("/user.json");
        console.log(5)
        console.log(res)
       
       // console.log(res) 
      
    }  
      
   
    render(){
           return <div>app</div>
        //    if(!this.state.user.length) {return };
        //    return (
        //    <div className="panel panel-default">
        //         <div className="panel-heading">评论</div>
        //         <div className="panel-body">
                   
        //         {this.state.user.map(function(item,index){
        //               return
        //               <div className="media">
        //                 <div className="media-left">
        //                     <img className="media-object" src={item.avatar} alt="头像" />
        //                 </div>
        //                 <div className="media-body">
        //                   <h4 className="media-heading">{item.username}</h4>
        //                   <h4 className="media-heading">{item.content}</h4>
        //                 </div>
        //               </div>
        //            })
                 
                 
        //         }


                   
        //         </div>
        //    </div>
         //  )
         
         
        
    }
}






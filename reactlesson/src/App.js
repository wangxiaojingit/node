import React,{Component}from "react";
import ReactDom,{render} from "react-dom";
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.css'
import Comment from "./components/comment.js"
import List from "./components/list.js"

import {Provider} from "./context"
// axios.interceptors.request.use(function(config){
//       config.headers.a=1;
//       return config
    
// })
//拦截器,在发出相应之前,对数据进行处理
axios.interceptors.response.use(function(res){
    if(res.data.code==0){
       return res.data.users;
    }
    Promise.reject("error")
})
export default class App extends Component{
    state={users:[],count:0}
    async componentDidMount(){
        try {
          let users=await axios.get("/user.json");
          this.setState({users});
        } catch (error) {
          throw new Error(error) ;
        }
    }  
    removeuser=(id)=>{
       let users=this.state.users.filter((item,index)=>{
              return item.id!=id;
       })
       this.setState({
           users
       })
    }
    adduser=(val)=>{
        
        /**
         * 尽量不要用这个方法,不要改变同一个引用地址的数据,如果引用地址相同,必须要this.setState({})重新更新下状态
         * this.state.users.push({avatar: '', content: val, username: 'zfpx'})
           this.setState({})
         */
       this.setState({
           users:[...this.state.users,{avatar: 'http://cdn.duitang.com/uploads/item/201510/16/20151016090939_hN4Wm.jpeg', content: val, username: 'zfpx'}]
       })
    }
    increace=()=>{
        this.setState({
            count:this.state.count+1
        })
    }
    render(){
           return(
               <Provider value={{increace:this.increace}}>
                <div className="container">
                    <div className="panel panel-danger">
                       <div className='panel-heading'>评论</div>
                       <div className="panel-body">
                       <List users={this.state.users} removeuser={this.removeuser} ></List>
                        </div>
                       <div className="panel-footer" >
                          <Comment adduser={this.adduser}></Comment>
                       </div>
                       <div>{this.state.count}</div>
                    </div>
                </div>
                </Provider>
           ) 

           
        
         
        
    }
}






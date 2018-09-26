import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";
import {Link} from "react-router-dom"

export default class List extends Component{
    state={
        users:[]
    }
    componentWillMount(){
        this.setState({
            users:JSON.parse(localStorage.getItem("list"))
        })
        
    }
    toDetailHanddel=(id)=>{
      this.props.history.push("/user/detail/"+id)
    }
    render(){
        return (<table className="table table-bordered">
            <thead>
                <tr>
                    <th>id</th>
                    <th>姓名</th>
                </tr>
            </thead>
            <tbody>
                    {   
                        this.state.users.map((item,key)=>{
                            return (
                                // <tr key={item.id} onClick={this.toDetailHanddel.bind(null,item.id)}>
                                <tr key={item.id}>
                                        {/* 传值是通过state 是localtion.state的值,通过this.props.localtion.state 可以取值 */}
                                        <td> <Link to={{pathname:"/user/detail/"+item.id,state:item}}>{item.id}</Link></td>
                                        <td><Link to={{pathname:"/user/detail/"+item.id,state:item}}>{item.name}</Link></td>
                                    
                                </tr>
                            )
                        })
                    }
                
                
            </tbody>
        </table>)
    }
}
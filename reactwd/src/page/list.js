import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";

export default class List extends Component {
    state={
        lists:[]
    }
    componentWillMount(){
        if(localStorage.getItem("lists")){
           this.setState({
               lists:JSON.parse(localStorage.getItem("lists"))||[]
           })
        }
    }
    render(){
        return <table className="table table-striped">
        <thead>
            <tr>
                <th>id:</th>
                <th>名字:</th>
            </tr>
        </thead>
        <tbody>
            {  this.state.lists.map(function(item){
                return (<tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                </tr>)
            })
                
            }
            
        </tbody>

        </table>
    }
}
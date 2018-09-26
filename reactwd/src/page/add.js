import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";

export default class Add extends Component {
    submitHanddle=(e)=>{
       e.preventDefault();
       let val=this.nameref.current.value;
       console.log(val);
       let list=JSON.parse(localStorage.getItem("lists"))||[];
       list.push({id:list.length+1,name:val});
       localStorage.setItem("lists",JSON.stringify(list));
       this.props.history.push("/user/list")

    }
    componentWillMount(){
        this.nameref=React.createRef();
    }
    render(){
        return <div>
            <form onSubmit={this.submitHanddle}>
                <div class="form-group">
                    <label>姓名:</label>
                    <input className="form-control" type="text" name="name" ref={this.nameref} required/>
                </div>
                    <input className="form-control btn btn-info" type="submit"/>
            </form>
        </div>
    }
}
import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";
import {Link,Route} from "react-router-dom";

import Add from"./add";
import List from "./list";
import Userbox from "./userbox"
export default class User extends Component {
    render(){                           
        return (<div className="container-fluid">
            <ul className="nav nav-pills nav-stacked col-md-3" style={{"textAlign":"left"}}>
            <Userbox to="/user/add">添加列表</Userbox>
            <Userbox to="/user/list">列表集</Userbox>
                {/* <li role="presentation" ><Link to="/user/add">添加列表</Link></li>
                <li role="presentation"><Link to="/user/list">列表集</Link></li> */}
               
           </ul>
           <div className="col-md-9">
                <Route path="/user/add" component={Add}></Route>
                <Route path="/user/list" component={List}></Route>

           </div>
        </div>)
    }
}

// 想要给选中的导航添加类名,可以通过Route 中的 children 里面的match,如果有match,说明选中,如果没有match 说明没有选中
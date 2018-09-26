import React ,{Component}from "react";
import ReactDom,{render} from "react-dom";
import Center from "./page/center";
import Home from "./page/home";
import User from "./page/user";
import Login from "./page/login"
import {HashRouter as Router,Route,Link,Switch,Redirect} from "react-router-dom";
import Index from "./page/index.js";
import Personalcenter from "./page/personalcenter.js"

import 'bootstrap/dist/css/bootstrap.css'
export default class App extends Component{
    render(){
        return (
            <Router>
                <div>
                    <Index>
                        {/* Switch 是只要匹配到了,就不用再往下匹配 */}
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path="/user" component={User} />
                            <Personalcenter path="/center" component={Center}></Personalcenter>                            
                            <Route path="/login" component={Login}/>
                            <Redirect to="/home"/>
                        </Switch>
                    </Index>
                </div>
            </Router>)
        }
}
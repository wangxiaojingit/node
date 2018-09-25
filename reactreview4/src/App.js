import React, { Component } from 'react';
import {ReactDom,render} from "react-dom";
import {HashRouter as Router,Link,Route,Redirect,Switch}from "react-router-dom";
// import {HashRouter as Router,Route,Link,Switch,Redirect} from "react-router-dom";                          
import Home from "./page/home.js";
import User from "./page/user.js";
import Center from "./page/center.js";
import Admin from "./page/admin.js";
import Detail from "./page/detail.js";
import Index from "./page/index.js";
import CenterWrapper from "./page/centerWrapper.js"
import './App.css';

class App extends Component {
  render() {
    return (
     <Router>
       <div>
         <Index>
           <Switch>
              <Route path="/home" component={Home} />
              <Route path="/user" component={User} />
              <Route path="/center" component={CenterWrapper}></Route>
              <Route path="/admin" component={Admin}></Route>
              {/* 当上面的路由都不匹配的时候就会走这个重定向,跑到home组件 */}
              <Redirect to="/home" ></Redirect> 
           </Switch>
         </Index>
        
       </div>
     </Router>
    );
  }
}

export default App;

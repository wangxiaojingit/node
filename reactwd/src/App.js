import React, { Component } from 'react';
import {HashRouter as Router,Route,Link,Switch} from "react-router-dom";

import Home from "./page/home";
import User from "./page/user";
import Center from "./page/center";
import Admin from "./page/admin";
import Index from "./page/index";
import Centerwrapper from "./page/centerwrapper";
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Index>
            <Switch>
              <Route path="/home" component={Home}></Route>
              <Route path="/home" component={Home}></Route>
              <Route path="/user" component={User}></Route>
              <Centerwrapper path="/center" component={Center}></Centerwrapper>
              <Route path="/admin" component={Admin}></Route>
            </Switch>
        </Index>
      </Router>
      </div>
    );
  }
}

export default App;

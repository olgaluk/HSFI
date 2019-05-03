import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Home2 from './components/Home2';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact component={Home} path="/"></Route>
          <Route component={Signin} path="/signin"></Route>
          <Route component={Signup} path="/signup"></Route>
          <Route component={Home2} path="/home2"></Route>
        </Switch>
      </div>
    );
  }
}

export default App;

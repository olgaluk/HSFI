import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Main from './components/Main';

import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact component={Home} path="/"></Route>
          <Route component={Signin} path="/signin"></Route>
          <Route component={Signup} path="/signup"></Route>
          <Route component={Main} path="/main"></Route>
        </Switch>
      </div>
    );
  }
}

export default App;

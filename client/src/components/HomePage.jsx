import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import Signin from './Signin';
import Signup from './Signup';
import Home from './Home';

class HomePage extends Component {

  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/signup" component={Signup}></Route>
      </Switch>
    );
  }
}

export default HomePage;
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Header from './Header';
import AccountStart from './account/AccountStart';
import Manager from './account/Manager';
import Coordinator from './account/Coordinator';
import Operator from './account/Operator';

import './Signup.css';

class Signup extends Component {

  render() {
    return (
      <div className="signup">
        <Header />
        <Switch>
          <Route exact path="/signup" component={AccountStart}></Route>
          <Route path="/signup/manager" component={Manager}></Route>
          <Route path="/signup/coordinator" component={Coordinator}></Route>
          <Route path="/signup/operator" component={Operator}></Route>
        </Switch>
        <Link to="/signin"><button type="button">Sign in</button></Link>
      </div >
    )
  }
}

export default Signup;

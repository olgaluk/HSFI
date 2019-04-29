import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Show from './Show';
import Header2 from './Header2';
import Home from './Home';

import './Home2.css';

class Home2 extends Component {

  render() {
    return (
      <div className="container">
        <div className="clearfix">
          <Header2 />
          <h3 className="text-muted">Page</h3>
          <Switch>
            <Route exact path="/home2" component={Show}></Route>
            <Route exact path="/home2/show" component={Show}></Route>
            <Route exact path="/" component={Home}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Home2;
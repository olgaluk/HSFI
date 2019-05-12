import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Route, Switch } from "react-router-dom";

import Show from './Show';
import HeaderMain from './main/HeaderMain';
import Home from './Home';

import './Main.css';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
 
});

class Main extends Component {

  render() {
    return (
      <div className="container">
        <div className="clearfix">
          <HeaderMain />
          <h3 className="text-muted">Page</h3>
          <Switch>
            <Route exact path="/main/account" component={Show}></Route>

            <Route exact path="/main/vendor-registration" component={Show}></Route>
            <Route exact path="/main/scratch-card" component={Show}></Route>
            <Route exact path="/main/hotline" component={Show}></Route>
            <Route exact path="/main/inspection" component={Show}></Route>
            <Route exact path="/main/report" component={Show}></Route>

            <Route exact path="/" component={Home}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
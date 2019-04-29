import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Home2 from './components/Home2';

import { connect } from 'react-redux';
import { simpleAction } from './actions/simpleAction';

import './App.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

class App extends Component {
  simpleAction = (event) => {
    this.props.simpleAction();
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact component={Home} path="/"></Route>
          <Route component={Signin} path="/signin"></Route>
          <Route component={Signup} path="/signup"></Route>
          <Route component={Home2} path="/home2"></Route>
        </Switch>
        <button onClick={this.simpleAction}>Test redux action</button>
        <pre>
          {
            JSON.stringify(this.props)
          }
        </pre>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

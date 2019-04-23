import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Home2 from './components/Home2';
import logo from './images/Fresh.png';

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
      //<Router>
      <div className="App">
        <header className="header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signin">Signin</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </header>
        <Route exact component={Home} path="/"></Route>
        <Route exact component={Signin} path="/signin"></Route>
        <Route exact component={Signup} path="/signup"></Route>
        <Route exact component={Home2} path="/home2"></Route>

        <button onClick={this.simpleAction}>Test redux action</button>
        <pre>
          {
            JSON.stringify(this.props)
          }
        </pre>
      </div>
      //</Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

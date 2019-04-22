import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Signin from './components/Signin';
import Signup from './components/Signup';
import logo from './images/Fresh.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };

    this.setState = this.setState.bind(this);
  }

  updateUser = (value) => {
    this.setState({ user: value })
  } 
  
  render() {
    return (
      <Router>
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

          <Route component={Signin} path="/signin"></Route>
          <Route component={Signup} path="/signup"></Route>
        </div>
      </Router>
    );
  }
}

export default App;

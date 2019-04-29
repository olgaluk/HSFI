import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import './Header.css';

class Header2 extends Component {

  render() {
    return (
      <div>
        <header className="header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            <li>
              <Link to="/home2">Home2</Link>
            </li>
            <li>
              <Link to="/home2/show">Form</Link>
            </li>
            <li>
              <Link to="/"><i class="fas fa-sign-out-alt"></i> Sign out</Link>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}

export default Header2;
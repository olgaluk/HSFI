import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import './Header.css';

class Header extends Component {

  render() {
    return (
      <div>
        <header className="header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            <li>
              <Link to="/"><i className="fas fa-home"></i> Home</Link>
            </li>
            <li>
              <Link to="/signin"><i className="fas fa-sign-in-alt"></i> Sign in</Link>
            </li>
            <li>
              <Link to="/signup"><i className="fas fa-user-plus"></i> Sign up</Link>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}

export default Header;
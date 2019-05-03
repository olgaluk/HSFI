import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logo from '../images/logo.png';
import './Header2.css';

class Header2 extends Component {

  render() {
    return (
      <div>
        <header className="header">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            <li>
              <Link to="/home2">Vendor registration desk</Link>
            </li>
            <li>
              <Link to="/home2">Scratch card desk</Link>
            </li>
            <li>
              <Link to="/home2">Hotline</Link>
            </li>
            <li>
              <Link to="/home2">Inspection desk</Link>
            </li>
            <li>
              <Link to="/home2">Report</Link>
            </li>
            <li>
              <Link to="/home2/show">Form</Link>
            </li>
            <li>
              <Link to="/"><i className="fas fa-sign-out-alt"></i> Sign out</Link>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}

export default Header2;
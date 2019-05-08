import React, { Component } from 'react';
import { Link } from "react-router-dom";

import logo from '../../images/logo.png';
import Menu from './Menu';

import './HeaderMain.css';

class HeaderMain extends Component {

  render() {
    return (
      <div>
        <header className="header header-main">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            <li className="account">
              <Link to="/main/account"><i class="fas fa-user-circle"></i> your account</Link>
            </li>
            <li>
              <Link to="/"><i className="fas fa-sign-out-alt"></i> Sign out</Link>
            </li>
          </ul>
        </header>
        <section>
          <Menu />
        </section>
        <pre>
          <marquee>
            {
              JSON.stringify(this.props.simpleReducer)
            }
          </marquee>
        </pre>
      </div>
    );
  }
}

export default HeaderMain;
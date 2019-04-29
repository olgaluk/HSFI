import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './AccountStart.css';

class AccountStart extends Component {

  render() {
    return (
      <div>
        <h2>Please select the type of account you want to create:</h2>
        <Link to="/signup/manager"><button className="button-position" type="button">Manager</button></Link>
        <Link to="/signup/coordinator"><button className="button-position" type="button">Coordinator</button></Link>
        <Link to="/signup/operator"><button className="button-position" type="button">Operator</button></Link>
      </div>
    );
  }
}

export default AccountStart;
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import './Menu.css';

class Menu extends Component {

  render() {
    return (
      <div id="menu" className="menu">
        <ul className="supermenu">
          <li>
            <Link to="/main/vendor-registration">Vendor registration desk</Link>
          </li>
          <li>
            <Link to="/main/scratch-card">Scratch card desk</Link>
          </li>
          <li>
            <Link to="/main/hotline">Hotline</Link>
          </li>
          <li>
            <Link to="/main/inspection">Inspection desk</Link>
          </li>
          <li>
            <Link to="/main/report">Report</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Menu;
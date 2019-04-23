import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Show from './Show';

class Home2 extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <div className="clearfix">
            <div>
              <ul>
                <li>
                  <Link to="/home2">Home2</Link>
                </li>
                <li>
                  <Link to="/home2/show">Form</Link>
                </li>
                <li>
                  <Link to="/home2">Logout</Link>
                </li>
              </ul>
            </div>
            <h3 className="text-muted">Page</h3>
            <div>
              <Route exact path="/home2/show" component={Show}></Route>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default Home2;
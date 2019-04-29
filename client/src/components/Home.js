import React, { Component } from 'react';

import Header from './Header';

import './Home.css';

class Home extends Component {

  render() {
    return (
      <div className="home-page">
        <Header />
        <h1>Healthy Street Food Incentives</h1>
      </div>
    );
  }
}

export default Home;
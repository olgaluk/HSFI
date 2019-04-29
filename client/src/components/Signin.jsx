import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from 'axios';

import Header from './Header';
import './Signin.css';

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      email: '',
      password: '',
      user: null,
    };
  }

  signIn() {
    axios.post('/signin', {
      email: this.state.email,
      password: this.state.password,
    })
      .then(function (response) {
        if (response.data === 'success') {
          window.location.assign('http://localhost:3000/home2');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="signin">
        <Header />
        <form className="form-signin">
          <h2 className="form-signin-heading">Please sign in</h2>
          <label for="inputEmailSignin" className="form-label-signin">Email address</label>
          <input type="email" onChange={this.handleEmailChange} id="inputEmailSignin" className="form-control" placeholder="Email address" required autofocus />
          <label for="inputPasswordSignin" className="form-label-signin">Password</label>
          <input type="password" onChange={this.handlePasswordChange} id="inputPasswordSignin" className="form-control" placeholder="Password" required />

          <button onClick={this.signIn} type="button">Sign in</button>
        </form>
        <div>
          <Link to="/signup"><button type="button">Create account</button></Link>
        </div>
      </div>
    )
  }
}

export default Signin;
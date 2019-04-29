import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import Header from './Header';
import './Signup.css';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  signUp() {
    axios.post('/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    })
      .then(function (response) {
        console.log(response);
        if (response.data === 'success') {
          window.location.assign('http://localhost:3000/signin');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="signup">
        <Header />
        <form className="form-signup">
          <h2 className="form-signin-heading">Please sign up</h2>
          <label for="inputName" className="form-label-signup">Name</label>
          <input type="name" onChange={this.handleNameChange} id="inputName" className="form-control" placeholder="Name" required autofocus />
          <label for="inputEmail" className="form-label-signup">Email address</label>
          <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
          <label for="inputPassword" className="form-label-signup">Password</label>
          <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />

          <button onClick={this.signUp} type="button">Sign up</button>
        </form>
        <div>
          <Link to="/signin"><button type="button">Sign in</button></Link>
        </div>
      </div>
    )
  }
}

export default Signup;
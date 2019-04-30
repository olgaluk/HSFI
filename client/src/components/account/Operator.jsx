import React from 'react';
import axios from 'axios';

import SelectCountry from './SelectCountry';
import SelectTask from './SelectTask';

import './Operator.css';

class Operator extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleTaskChange = this.handleTaskChange.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      task: null,
      country: '',
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

  handleTaskChange(e) {
    this.setState({ task: e.target.value });
  }

  signUp() {
    axios.post('/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      task: this.state.task,
      country: this.state.country,
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
      <div className="signup-operator">
        <h2>Please fill out the form</h2>
        <form className="form-signup-operator">
          <h3 className="signup-operator-heading">Operator</h3>
          <SelectCountry />
          <input type="text" onChange={this.handleNameChange} id="inputName" className="form-control-operator" placeholder="Name" required />
          <input type="text" id="inputOrg" className="form-control-operator" placeholder="Organization" required />
          <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control-operator" placeholder="Email" required />
          <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control-operator" placeholder="Password" required />
          <SelectTask />
        </form>
        <button onClick={this.signUp} type="button">Sign up</button>
      </div >
    )
  }
}

export default Operator;
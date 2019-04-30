import React from 'react';
import axios from 'axios';

import SelectCountry from './SelectCountry';

import './Coordinator.css';

class Coordinator extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);

    this.state = {
      name: '',
      email: '',
      password: '',
      phone: '',
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

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }

  /*handleCountryChange(e) {    
    this.setState({ country: e.target.value });
  }*/


  signUp() {
    axios.post('/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      phone: this.state.phone,
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
      <div className="signup-сoordinator">
        <h2>Please fill out the form</h2>
        <form className="form-signup-сoordinator">
          <h3 className="signup-сoordinator-heading">NPC</h3>
          <SelectCountry />
          <input type="text" onChange={this.handleNameChange} id="inputName" className="form-control-сoordinator" placeholder="Name" required />
          <input type="text" id="inputOrg" className="form-control-сoordinator" placeholder="Organization" required/>
          <input type="tel" onChange={this.handlePhoneChange} id="inputPhone" className="form-control-сoordinator" placeholder="Phone" />
          <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control-сoordinator" placeholder="Email" required />
          <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control-сoordinator" placeholder="Password" required />
        </form>
        <button onClick={this.signUp} type="button">Sign up</button>
      </div >
    )
  }
}

export default Coordinator;
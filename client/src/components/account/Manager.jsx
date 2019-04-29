import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

import SelectCountry from './SelectCountry';

import './Manager.css';

class Manager extends React.Component {
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
      <div className="signup-manager">
        <h2>Please fill out the form</h2>
        <form className="form-signup-manager">
          <h3 className="signup-manager-heading">FAO Managers</h3>
          <input type="name" onChange={this.handleNameChange} id="inputName" className="form-control-manager" placeholder="Name" required autofocus />
          <select id="inputOffice" name="offices" className="form-control-manager" required>
            <option value="HQ">HQ</option>
            <option value="Country list">Country list</option>
          </select>
          <SelectCountry />
          <input type="phone" onChange={this.handlePhoneChange} id="inputPhone" className="form-control-manager" placeholder="Phone" autofocus />
          <input type="email" onChange={this.handleEmailChange} id="inputEmail" className="form-control-manager" placeholder="Email" required />
          <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control-manager" placeholder="Password" required />
        </form>
        <button onClick={this.signUp} type="button">Sign up</button>
      </div >
    )
  }
}

export default Manager;
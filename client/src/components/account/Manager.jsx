import React from 'react';
import axios from 'axios';

import SelectCountry from './SelectCountry';

import './Manager.css';

import {
  addPosition,
  addName,
  addEmail,
  addPassword,
  addPhone,
  addOrganization,
  addTask
} from '../../actions/simpleAction';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  addPosition: (position) => dispatch(addPosition(position)),
  addName: (name) => dispatch(addName(name)),
  addEmail: (email) => dispatch(addEmail(email)),
  addPassword: (password) => dispatch(addPassword(password)),
  addPhone: (phone) => dispatch(addPhone(phone)),
  addOrganization: (organization) => dispatch(addOrganization(organization)),
  addTask: (task) => dispatch(addTask(task))
});

class Manager extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  addName = (e) => {
    this.props.addPosition('manager');
    this.props.addTask('all');
    this.props.addOrganization('all');
    this.props.addName(e.target.value);
  };

  addEmail = (e) => {
    this.props.addEmail(e.target.value);
  };

  addPassword = (e) => {
    this.props.addPassword(e.target.value);
  };

  addPhone = (e) => {
    this.props.addPhone(e.target.value);
  };

  signUp() {
    axios.post('/signup', {
      position: this.props.simpleReducer.position,
      name: this.props.simpleReducer.name,
      email: this.props.simpleReducer.email,
      password: this.props.simpleReducer.password,
      phone: this.props.simpleReducer.phone,
      country: this.props.simpleReducer.country,
      organization: this.props.simpleReducer.organization,
      task: this.props.simpleReducer.task,
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
          <h3 className="signup-manager-heading">FAO Manager</h3>
          <input type="text" onChange={this.addName.bind(this)} id="inputName" className="form-control-manager" placeholder="Name" required />
          <select id="inputOffice" name="offices" className="form-control-manager" required>
            <option value="HQ">HQ</option>
            <option value="Country list">Country list</option>
          </select>
          <SelectCountry />
          <input type="tel" onChange={this.addPhone.bind(this)} id="inputPhone" className="form-control-manager" placeholder="Phone" />
          <input type="email" onChange={this.addEmail.bind(this)} id="inputEmail" className="form-control-manager" placeholder="Email" required />
          <input type="password" onChange={this.addPassword.bind(this)} id="inputPassword" className="form-control-manager" placeholder="Password" required />
        </form>
        <button onClick={this.signUp} type="button">Sign up</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manager);
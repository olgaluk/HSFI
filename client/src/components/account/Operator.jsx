import React from 'react';
import axios from 'axios';

import SelectCountry from './SelectCountry';
import SelectTask from './SelectTask';

import './Operator.css';

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

class Operator extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
  }

  addName = (e) => {
    this.props.addPosition('operator');
    this.props.addPhone('');
    this.props.addName(e.target.value);
  };

  addEmail = (e) => {
    this.props.addEmail(e.target.value);
  };

  addPassword = (e) => {
    this.props.addPassword(e.target.value);
  };

  addOrganization = (e) => {
    this.props.addOrganization(e.target.value);
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
      <div className="signup-operator">
        <h2>Please fill out the form</h2>
        <form className="form-signup-operator">
          <h3 className="signup-operator-heading">Operator</h3>
          <SelectCountry />
          <input type="text" onChange={this.addName.bind(this)} id="inputName" className="form-control-operator" placeholder="Name" required />
          <input type="text" onChange={this.addOrganization.bind(this)} id="inputOrg" className="form-control-operator" placeholder="Organization" required />
          <input type="email" onChange={this.addEmail.bind(this)} id="inputEmail" className="form-control-operator" placeholder="Email" required />
          <input type="password" onChange={this.addPassword.bind(this)} id="inputPassword" className="form-control-operator" placeholder="Password" required />
          <SelectTask />
        </form>
        <button onClick={this.signUp} type="button">Sign up</button>
        <pre>
          <marquee>
            {
              JSON.stringify(this.props.simpleReducer)
            }
          </marquee>
        </pre>
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Operator);
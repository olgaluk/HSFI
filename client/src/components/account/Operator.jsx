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
  addTask,
  resetStoreUser
} from '../../actions/usersActions';
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
  addTask: (task) => dispatch(addTask(task)),
  resetStoreUser: () => dispatch(resetStoreUser())
});

class Operator extends React.Component {
  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.state = {
      message: '',
    };
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
    const self = this;
    const { position, name, email, password, phone, country, organization, task } = this.props.users;
    axios.post('/signup', {
      position,
      name,
      email,
      password,
      phone,
      country,
      organization,
      task,
    })
      .then(function (response) {
        console.log(response);
        if (response.data === 'success') {
          self.props.resetStoreUser();
          self.props.history.push('/signin');
        }
      })
      .catch(function (error) {
        self.setState({
          message: 'Check the correctness of the entered data!',
        });
        console.log(error);
      });
  }

  render() {
    return (
      <div className="signup-operator">
        <h2>Please fill out the form</h2>
        <h3>{this.state.message}</h3>
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
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Operator);
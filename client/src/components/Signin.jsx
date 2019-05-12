import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import axios from 'axios';

import Header from './Header';
import './Signin.css';

import {
  addPosition,
  addName,
  addEmail,
  addPassword,
  addPhone,
  addOrganization,
  addTask,
  addCountry,
  changeIsLogin
} from '../actions/simpleAction';
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
  addCountry: (country) => dispatch(addCountry(country)),
  changeIsLogin: (isLoggedIn) => dispatch(changeIsLogin(isLoggedIn))
});

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      email: '',
      password: '',
      response: ''
    };
  }

  addPosition = (e) => {
    this.props.addPosition(e);
  }

  addName = (e) => {
    this.props.addName(e);
  };

  addEmail = (e) => {
    this.props.addEmail(e);
  };

  addPassword = (e) => {
    this.props.addPassword(e);
  };

  addPhone = (e) => {
    this.props.addPhone(e);
  };

  addOrganization = (e) => {
    this.props.addOrganization(e);
  };

  addTask = (e) => {
    this.props.addTask(e);
  }

  addCountry = (e) => {
    this.props.addCountry(e);
  }

  changeIsLogin = (isLoggedIn) => {
    this.props.changeIsLogin(isLoggedIn);
  }

  componentDidUpdate() {
    if (this.state.response === 'true') {
      if (!this.props.simpleReducer.isLoggedIn) {
        this.changeIsLogin(true);
      }
      this.props.history.push('/main');
      console.log('path from history: ', this.props.history);
    }
  }

  signIn() {
    const self = this;
    axios.post('/signin', {
      email: this.state.email,
      password: this.state.password,
    })
      .then(function (response) {
        if (response.data) {
          console.log(response.data);
          self.addPosition(response.data.position);
          self.addName(response.data.name);
          self.addEmail(response.data.email);
          self.addPassword(response.data.password);
          self.addPhone(response.data.phone);
          self.addOrganization(response.data.organization);
          self.addTask(response.data.task);
          self.addCountry(response.data.country);
          self.setState({ response: 'true' });
        }
      }
      )
      .catch(function (error) {
        self.setState({ response: 'Incorrect email or password!!!' });
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
          <h3>{this.state.response}</h3>
          <label htmlFor="inputEmailSignin" className="form-label-signin">Email address</label>
          <input type="email" onChange={this.handleEmailChange} id="inputEmailSignin" className="form-control" placeholder="Email address" required />
          <label htmlFor="inputPasswordSignin" className="form-label-signin">Password</label>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Signin));
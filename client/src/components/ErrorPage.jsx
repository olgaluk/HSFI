import React, { Component } from 'react';

import logo from '../images/logo.png';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { changeIsLogin, resetStoreUser } from '../actions/usersActions';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeIsLogin: (isLoggedIn) => dispatch(changeIsLogin(isLoggedIn)),
  resetStoreUser: () => dispatch(resetStoreUser())
});

class ErrorPage extends Component {

  componentWillMount() {
    this.props.resetStoreUser();
  }

  signIn() {
    this.props.changeIsLogin('unregistered');
    this.props.history.push('/signin');
  }

  render() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <h2>This page is for authorized users only!</h2>
        <button onClick={this.signIn.bind(this)} type="button"><i className="fas fa-sign-in-alt"></i> Sign in</button>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ErrorPage));

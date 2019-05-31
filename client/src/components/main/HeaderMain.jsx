import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { withRouter } from 'react-router';
import axios from 'axios';

import logo from '../../images/logo.png';
import Menu from './Menu';

import './HeaderMain.css';

import { changeIsLogin, resetStoreUser } from '../../actions/usersActions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeIsLogin: (isLoggedIn) => dispatch(changeIsLogin(isLoggedIn)),
  resetStoreUser: () => dispatch(resetStoreUser())
});

class HeaderMain extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);

    this.state = {
      response: ''
    };
  }

  componentDidUpdate() {
    if (this.state.response === 'false') {
      if (this.props.users.isLoggedIn === 'registered') {
        this.props.changeIsLogin('unregistered');
      }
      this.props.history.push('/');
      console.log('path from history: ', this.props.history);
    }
  }

  signOut() {
    const self = this;
    axios.get('/main')
      .then(function (response) {
        if (response.status === 200) {
          self.props.resetStoreUser();
          self.setState({ response: 'false' });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <header className="header header-main">
          <img src={logo} className="App-logo" alt="logo" />
          <ul>
            <li className="account">
              <Link to="/main/account"><i className="fas fa-user-circle"></i> your account</Link>
            </li>
            <li>
              <span onClick={this.signOut}><i className="fas fa-sign-out-alt"></i> Sign out</span>
            </li>
          </ul>
        </header>
        <section>
          <Menu />
        </section>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderMain));
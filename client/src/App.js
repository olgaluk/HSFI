import React, { Component } from 'react';

import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';

import { connect } from 'react-redux';

import axios from 'axios';

import Main from './components/Main';

import HomePage from './components/HomePage';
import ErrorPage from './components/ErrorPage';

import './App.css';

import {
  addPosition,
  addName,
  addEmail,
  addPassword,
  addPhone,
  addOrganization,
  addTask,
  addCountry,
  changeIsLogin,
} from './actions/usersActions';

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

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: 'unregistered'
    };
  }

  componentDidUpdate() {
    if (this.props.users.isLoggedIn === 'registered') {
      console.log('registered!!!!!!!');
      if (this.state.isLogged !== 'registered') {
        this.setState({
          isLogged: 'registered'
        });
      }
    } else if (this.props.users.isLoggedIn === 'unregistered') {
      if (this.state.isLogged !== 'unregistered') {
        console.log('unregistered!!!!!');
        this.setState({
          isLogged: 'unregistered'
        });
      }
    } else if (this.props.users.isLoggedIn === 'error') {
      if (this.state.isLogged !== 'error') {
        console.log('this is error!!!!!!!');
        this.setState({
          isLogged: 'error'
        });
      }
    }
  }

  componentWillMount() {
    const self = this;
    axios.get('/home/status')
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          self.setState({ isLogged: 'registered' });
          self.props.changeIsLogin('registered');

          const { position, name, email, password, phone, organization, task, country } = response.data;
          self.props.addPosition(position);
          self.props.addName(name);
          self.props.addEmail(email);
          self.props.addPassword(password);
          self.props.addPhone(phone);
          self.props.addOrganization(organization);
          self.props.addTask(task);
          self.props.addCountry(country);
        }
      }, () => {
        const pathState = window.location.pathname !== "/" &&
          window.location.pathname !== "/signin" &&
          window.location.pathname !== "/signup" &&
          window.location.pathname !== "/signup/manager" &&
          window.location.pathname !== "/signup/coordinator" &&
          window.location.pathname !== "/signup/operator";
        if (pathState) {
          self.setState({ isLogged: 'error' });
          self.props.changeIsLogin('error');
        } else {
          self.setState({ isLogged: 'unregistered' });
          self.props.changeIsLogin('unregistered');
        }
      });
  }

  render() {
    let page;

    if (this.state.isLogged === 'registered') {
      page = <Switch>
        <Route path="/main" component={Main}></Route>
      </Switch>;
    } else if (this.state.isLogged === 'unregistered') {
      page = <HomePage />;
    } else if (this.state.isLogged === 'error') {
      page = <ErrorPage />;
    }

    return (
      <div className="App">
        {page}
        <pre>
          <marquee>
            {
              JSON.stringify(this.props.vendors)
            }
            
          </marquee>
        </pre>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

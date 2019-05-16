import React, { Component } from 'react';

import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router';

import { connect } from 'react-redux';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import Main from './components/Main';

import './App.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogged: false
    };
  }

  componentDidUpdate() {
    if (this.props.simpleReducer.isLoggedIn) {
      console.log('ok');
      if (!this.state.isLogged) {
        this.setState({
          isLogged: true
        });
      }
      console.log('path from history: ', this.props.history);
    } else {
      if (this.state.isLogged) {
        console.log('no');
        this.setState({
          isLogged: false
        });
      }
    }
  }

  render() {
    let page;

    if (this.state.isLogged) {
      page = <Switch>
    <Route path="/main" component={Main}></Route>
    </Switch>;
    } else {
      page = <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/signin" component={Signin}></Route>
        <Route path="/signup" component={Signup}></Route>
      </Switch>;
    }
    return (
      <div className="App">
        {page}
        <pre>
          <marquee>
            {
              JSON.stringify(this.props)
            }
          </marquee>
        </pre>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

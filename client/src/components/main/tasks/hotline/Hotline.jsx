import React from 'react';
import axios from 'axios';

import './Hotline.css';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});

class Hotline extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);

    this.state = {
      operatorName: this.props.simpleReducer.name,
      date: '',
      idCaller: '',
      serialNumber: '',
      message: '',
      isRegistered: false
    };
  }

  handleSerialNumberChange(e) {
    this.setState({ serialNumber: e.target.value });
  }

  handleIdCallerChange(e) {
    this.setState({ idCaller: e.target.value });
  }

  componentWillMount() {
    const date = new Date();
    this.setState({
      date: date
    });
  }

  register() {
    const self = this;
    axios.post('/hotline', {
      operatorName: this.state.operatorName,
      date: this.state.date,
      idCaller: this.state.idCaller,
      serialNumber: this.state.serialNumber,
    })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          self.setState({
            message: 'Call successfully registered!',
            isRegistered: true
          });
        }
      })
      .catch(function () {
        self.setState({
          message: 'Check the correctness of the entered data!',
        });
      });
  }

  showForm() {
    this.setState({
      message: '',
      isRegistered: false
    });
  }

  render() {
    let page;

    if (this.state.isRegistered) {
      page = <div>
        <h2>{this.state.message}</h2>
        <button onClick={this.showForm.bind(this)} type="button">{'back to register'.toLocaleUpperCase()}</button>
      </div>;
    } else {
      page = <div className="scratch-card">
        <h2>Please fill out the form</h2>
        <h3>{this.state.message}</h3>
        <form className="form-scratch-card">
          <h3 className="scratch-card-heading">Call form</h3>
          <p><b>Operator's name:</b> {this.state.operatorName}</p>
          <p><b>Call date:</b> {this.state.date.toDateString()}</p>
          <input type="text" onChange={this.handleIdCallerChange.bind(this)} className="form-control-scratch" placeholder="National ID n. of caller" required />
          <input type="text" onChange={this.handleSerialNumberChange.bind(this)} className="form-control-scratch" placeholder="Scratch card serial no." required />
        </form>
        <button onClick={this.register} type="button">Register</button>
      </div>
    }

    return (
      <div>
        {page}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Hotline);
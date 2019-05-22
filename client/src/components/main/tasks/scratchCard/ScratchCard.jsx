import React from 'react';
import axios from 'axios';

import './ScratchCard.css';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});

class ScratchCard extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);

    this.state = {
      operatorName: this.props.simpleReducer.name,
      date: '',
      licenseNumber: '',
      vendorName: '',
      foodGroup: '',
      quantity: null,
      serialNumber: '',

      message: '',
      isRegistered: false
    };
  }

  addVendorName(name) {
    this.setState({ vendorName: name });
  }

  addFoodGroup(group) {
    this.setState({ foodGroup: group });
  }

  handleLicenseNumberChange(e) {
    const number = e.target.value;
    if (number.length === 6) {
      this.addVendorName('');
      this.addFoodGroup('');
      const self = this;
      axios.post('/scratch-card', {
        licenseNumber: number
      })
        .then(function (response) {
          console.log(response.data);
          if (response.data) {
            self.addVendorName(response.data.vendorName);
            self.addFoodGroup(response.data.foodGroup);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  handleQuantityChange(e) {
    this.setState({ quantity: e.target.value });
  }

  handleSerialNumberChange(e) {
    this.setState({ serialNumber: e.target.value });
  }

  componentWillMount() {
    const date = new Date();
    this.setState({
      date: date
    });
  }

  register() {
    const self = this;
    axios.post('/scratch-card', {

    })
      .then(function (response) {
        console.log(response);
        if (response.data === 'success') {

        }
      })
      .catch(function (error) {
        self.setState({
          message: 'Check the correctness of the entered data!',
        });
        console.log(error);
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
          <h3 className="scratch-card-heading">Transaction form</h3>
          <p><b>Operator's name:</b> {this.state.operatorName}</p>
          <p><b>Transaction date:</b> {this.state.date.toDateString()}</p>
          <input type="text" onChange={this.handleLicenseNumberChange.bind(this)} className="form-control-scratch" placeholder="License number (6 symbols)" required />
          <p><b>Vendor's name:</b> {this.state.vendorName}</p>
          <p><b>Food group:</b> {this.state.foodGroup}</p>

          <input type="number" onChange={this.handleQuantityChange.bind(this)} className="form-control-scratch" placeholder="Quantity of cards" required />
          <input type="text" onChange={this.handleSerialNumberChange.bind(this)} className="form-control-scratch" placeholder="First card's serial no." required />

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

export default connect(mapStateToProps, mapDispatchToProps)(ScratchCard);
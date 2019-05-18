import React from 'react';
import axios from 'axios';

import RegistrationCountry from './RegistrationCountry';
import Location from './Location';

import './VendorRegistration.css';

import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

});

class VendorRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);

    this.state = {
      operatorName: this.props.simpleReducer.name,
      date: '',
      country: '',
      vendorName: '',
      picture: '',
      licenseNumber: '',
      licensePicture: '',
      phone: '',
      email: '',
      location: [],
      schedule: '',
      ingredient: '',
      foodGroup: '',
      message: ''
    };
  }

  handleVendorNameChange(e) {
    this.setState({ vendorName: e.target.value });
  }

  handleLicenseNumberChange(e) {
    this.setState({ licenseNumber: e.target.value });
  }

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  componentWillMount() {
    const date = new Date();
    this.setState({
      date: date
    });
  }

  register() {
    const self = this;
    axios.post('/vendor-registration', {
      operatorName: this.state.operatorName,
      date: this.state.date,
      country: this.props.vendors.country,
      vendorName: this.state.vendorName,
      picture: this.state.picture,
      licenseNumber: this.state.licenseNumber,
      licensePicture: this.state.licensePicture,
      phone: this.state.phone,
      email: this.state.email,
      location: this.props.vendors.location,
      schedule: this.state.schedule,
      ingredient: this.state.ingredient,
      foodGroup: this.state.foodGroup,
    })
      .then(function (response) {
        console.log(response);
        if (response.data === 'success') {
          self.setState({
            country: '',
            vendorName: '',
            picture: '',
            licenseNumber: '',
            licensePicture: '',
            phone: '',
            email: '',
            location: [],
            schedule: '',
            ingredient: '',
            foodGroup: '',
            message: 'Vendor successfully registered!',
          });
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
      <div className="vendor-registration">
        <h2>Please fill out the form</h2>
        <h3>{this.state.message}</h3>
        <form className="form-vendor-registration">
          <h3 className="vendor-registration-heading">Registration form</h3>
          <p><b>Operator's name:</b> {this.state.operatorName}</p>
          <p><b>Registration date:</b> {this.state.date.toDateString()}</p>
          <RegistrationCountry />
          <input type="text" onChange={this.handleVendorNameChange.bind(this)} className="form-control-vendor" placeholder="Vendor name" required />
          <input type="text" onChange={this.handleLicenseNumberChange.bind(this)} className="form-control-vendor" placeholder="License number" required />
          <input type="tel" onChange={this.handlePhoneChange.bind(this)} className="form-control-vendor" placeholder="Phone" />
          <input type="email" onChange={this.handleEmailChange.bind(this)} className="form-control-vendor" placeholder="Email" required />
          <Location />
          
        </form>
        <button onClick={this.register} type="button">Register</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorRegistration);
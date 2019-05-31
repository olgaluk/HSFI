import React from 'react';
import axios from 'axios';

import RegistrationCountry from './RegistrationCountry';
import Location from './Location';
import Schedule from './Schedule';
import Ingredient from './Ingredient';
import FoodGroupVendor from './FoodGroupVendor';

import './VendorRegistration.css';

import { connect } from 'react-redux';

import { resetStoreVendor } from '../../../../actions/vendorsActions';
import { changeIsLogin } from '../../../../actions/usersActions';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  resetStoreVendor: () => dispatch(resetStoreVendor()),
  changeIsLogin: (isLoggedIn) => dispatch(changeIsLogin(isLoggedIn))
});

class VendorRegistration extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);

    this.state = {
      operatorName: '',
      date: '',
      country: '',
      vendorName: '',
      picture: '',
      licenseNumber: '',
      licensePicture: '',
      phone: '',
      email: '',
      location: [],
      schedule: [],
      ingredient: [],
      foodGroup: '',
      message: '',
      isRegistered: false
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
    this.setState({ date: date });
    setTimeout(() => this.setState({ operatorName: this.props.users.name }), 0);
  }

  register() {
    const self = this;
    const {
      operatorName,
      date,
      vendorName,
      picture,
      licenseNumber,
      licensePicture,
      phone,
      email } = this.state;
    const { country, location, schedule, ingredient, foodGroup } = this.props.vendors;
    axios.post('/main/vendor-registration', {
      operatorName,
      date,
      country,
      vendorName,
      picture,
      licenseNumber,
      licensePicture,
      phone,
      email,
      location,
      schedule,
      ingredient,
      foodGroup,
    })
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          self.setState({
            country: '',
            vendorName: '',
            picture: '',
            licenseNumber: '',
            licensePicture: '',
            phone: '',
            email: '',
            location: [],
            schedule: [],
            ingredient: [],
            foodGroup: '',
            message: 'Vendor successfully registered!',
            isRegistered: true
          });
          self.props.resetStoreVendor();
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          self.props.resetStoreVendor();
          self.props.changeIsLogin('error');
        } else if (error.response.status === 406) {
          self.setState({
            message: 'Vendor with this license number has already been created!',
          });
        } else {
          self.setState({
            message: 'Check the correctness of the entered data!',
          });
        }
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
      page = <div className="vendor-registration">
        <h2>Please fill out the form</h2>
        <h3>{this.state.message}</h3>
        <form className="form-vendor-registration">
          <h3 className="vendor-registration-heading">Registration form</h3>
          <p><b>Operator's name:</b> {this.state.operatorName}</p>
          <p><b>Registration date:</b> {this.state.date.toDateString()}</p>
          <RegistrationCountry />
          <input type="text" onChange={this.handleVendorNameChange.bind(this)} className="form-control-vendor" placeholder="Vendor name" required />
          <input type="text" onChange={this.handleLicenseNumberChange.bind(this)} className="form-control-vendor" placeholder="License number (6 symbols)" required />
          <input type="tel" onChange={this.handlePhoneChange.bind(this)} className="form-control-vendor" placeholder="Phone" />
          <input type="email" onChange={this.handleEmailChange.bind(this)} className="form-control-vendor" placeholder="Email" required />
          <Location />
          <Schedule />
          <Ingredient />
          <FoodGroupVendor />
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

export default connect(mapStateToProps, mapDispatchToProps)(VendorRegistration);
import React from 'react';

import { addVendorLocation } from '../../../../actions/vendorsActions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  addVendorLocation: (location) => dispatch(addVendorLocation(location))
});

class BusinessLocation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      address: {
        city: '',
        street: '',
        number: ''
      }
    };
  }

  handleCityChange = (e) => {
    const newAddress = this.state.address;
    this.setState({ address: { ...newAddress, city: e.target.value }});
    const currentState = this.state;
    currentState.address.city = e.target.value;
    this.props.addVendorLocation(currentState);
  }

  handleStreetChange = (e) => {
    const newAddress = this.state.address;
    this.setState({ address: { ...newAddress, street: e.target.value }});
    const currentState = this.state;
    currentState.address.street = e.target.value;
    this.props.addVendorLocation(currentState);
  }

  handleNumberChange = (e) => {
    const newAddress = this.state.address;
    this.setState({ address: { ...newAddress, number: e.target.value }});
    const currentState = this.state;
    currentState.address.number = e.target.value;
    this.props.addVendorLocation(currentState);
  }

  render() {
    return (
      <div className="business-location">
        <input type="text" onChange={this.handleCityChange.bind(this)} className="form-control-location" placeholder="City" required />
        <input type="text" onChange={this.handleStreetChange.bind(this)} className="form-control-location" placeholder="Street" required />
        <input type="text" onChange={this.handleNumberChange.bind(this)} className="form-control-location" placeholder="#" required />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessLocation);
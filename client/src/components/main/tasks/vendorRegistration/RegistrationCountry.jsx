import React from 'react';
import Select from 'react-select';

import country from '../../../account/country.json';

import '../../../account/SelectCountry.css';

import { addVendorCountry } from '../../../../actions/vendorsActions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  addVendorCountry: (country) => dispatch(addVendorCountry(country))
});

const options = country.map((elem) => {
  return {
    value: String(elem.name),
    label: elem.name
  };
});

class RegistrationCountry extends React.Component {

  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.addVendorCountry(selectedOption.map((elem) => {
      return elem.value;
    }));
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        placeholder="Country"
        isMulti
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationCountry);
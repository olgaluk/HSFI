import React from 'react';
import Select from 'react-select';

import country from './country.json';

import './SelectCountry.css';

import { addCountry } from '../../actions/usersActions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  addCountry: (country) => dispatch(addCountry(country))
});

const options = country.map((elem) => {
  return {
    value: String(elem.name),
    label: elem.name
  };
});

class SelectCountry extends React.Component {

  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.addCountry(selectedOption.value);
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        placeholder="Country"
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectCountry);
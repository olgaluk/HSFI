import React from 'react';
import Select from 'react-select';

import country from './country.json';

import './SelectCountry.css';

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
    console.log(`Option selected:`, selectedOption);
  }
  render() {
    const { selectedOption } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        placeholder="Country"
        required
      />
    );
  }
}

export default SelectCountry;
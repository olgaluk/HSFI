import React, { Component } from 'react';
import { Link } from "react-router-dom";

import Select from 'react-select';

import './ViewVendors.css';

import country from '../../../account/country.json';

const options = country.map((elem) => {
  return {
    value: String(elem.name),
    label: elem.name
  };
});

let currencySelected = {
  selectedOption: null,
};

class ViewVendors extends Component {

  showTable() {

  }

  showMap() {

  }

  handleCountryChange(selectedOption) {
    console.log(selectedOption);
    currencySelected = selectedOption;
  }

  render() {
    const { selectedOption } = currencySelected;

    return (
      <div className="view">
        <div className="view-сhoice">
          <button type="button" onClick={this.showTable.bind(this)}>TABLE</button>
          <button type="button" onClick={this.showMap.bind(this)}>MAP</button>
        </div>
       
        <form className="form-view">
          <h3 className="view-heading">Filter by</h3>
          <Select value={selectedOption} onChange={this.handleCountryChange.bind(this)} options={options} placeholder="Country" isMulti />
        </form>
        <div>
          <Link to="/main/inspection"><button type="button">inspection</button></Link>
        </div>
      </div>
    );
  }
}

export default ViewVendors;
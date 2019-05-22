import React from 'react';
import Select from 'react-select';

import { addVendorFoodGroup } from '../../../../actions/vendorsActions';

import { connect } from 'react-redux';

import './FoodGroupVendor.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  addVendorFoodGroup: (foodGroup) => dispatch(addVendorFoodGroup(foodGroup))
});

const foodGroup = ['A', 'B', 'C'];

const options = foodGroup.map((elem) => {
  return {
    value: String(elem),
    label: elem
  };
});

class FoodGroupVendor extends React.Component {

  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.addVendorFoodGroup(selectedOption.value);
  }

  render() {
    const { selectedOption } = this.state;

    return (
      <div className="food">
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          placeholder="Food group"
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodGroupVendor);

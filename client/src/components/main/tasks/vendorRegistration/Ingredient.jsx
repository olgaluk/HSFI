import React from 'react';

import { deleteVendorIngredient, addVendorIngredient } from '../../../../actions/vendorsActions';

import { connect } from 'react-redux';

import './Ingredient.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  deleteVendorIngredient: (index) => dispatch(deleteVendorIngredient(index)),
  addVendorIngredient: (ingredient) => dispatch(addVendorIngredient(ingredient))
});

class Ingredient extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldsCount: 1
    };
  }

  addIngredient() {
    this.setState({ fieldsCount: this.state.fieldsCount + 1 });
  }

  deleteIngredient() {
    if (this.state.fieldsCount > 1) {
      this.props.deleteVendorIngredient(this.state.fieldsCount - 1);
      this.setState({ fieldsCount: this.state.fieldsCount - 1 });
    }
  }

  handleIngredientChange(e) {
    const ingredient = {
      index: e.target.getAttribute('index'),
      data: e.target.value
    }
    this.props.addVendorIngredient(ingredient);
  }

  render() {
    let fields = [];

    for (let i = 0; i < this.state.fieldsCount; i++) {
      fields.push(<input type="text" onChange={this.handleIngredientChange.bind(this)} index={i} key={i.toString()} className="form-control-ingredient" placeholder="Ingredient source" required />);
    };
    return (
      <div className="ingredient">
        <div>
          {fields}
        </div>
        <div>
          <button onClick={this.addIngredient.bind(this)} type="button"><i className="fas fa-plus"></i></button>
          <button onClick={this.deleteIngredient.bind(this)} type="button"><i className="fas fa-minus"></i></button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Ingredient);

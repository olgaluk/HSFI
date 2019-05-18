import React from 'react';

import BusinessLocation from './BusinessLocation';
import { deleteVendorLocation } from '../../../../actions/vendorsActions';

import { connect } from 'react-redux';

import './Location.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  deleteVendorLocation: (index) => dispatch(deleteVendorLocation(index))
});

class Location extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldsCount: 1
    };
  }

  addBusinessLocation() {
    this.setState({ fieldsCount: this.state.fieldsCount + 1 });
  }

  deleteBusinessLocation() {
    if (this.state.fieldsCount > 1) {
      this.props.deleteVendorLocation(this.state.fieldsCount - 1);
      this.setState({ fieldsCount: this.state.fieldsCount - 1 });
    }
  }

  render() {
    let fields = [];

    for (let i = 0; i < this.state.fieldsCount; i++) {
      fields.push(<BusinessLocation index={i} key={i.toString()} />);
    }
    return (
      <div className="location">
        <div>
          {fields}
        </div>
        <div>
          <button onClick={this.addBusinessLocation.bind(this)} type="button"><i className="fas fa-plus"></i></button>
          <button onClick={this.deleteBusinessLocation.bind(this)} type="button"><i className="fas fa-minus"></i></button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
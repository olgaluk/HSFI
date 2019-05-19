import React from 'react';

import BusinessSchedule from './BusinessSchedule';
import { deleteVendorSchedule } from '../../../../actions/vendorsActions';

import { connect } from 'react-redux';

import './Schedule.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  deleteVendorSchedule: (index) => dispatch(deleteVendorSchedule(index))
});

class Schedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fieldsCount: 1
    };
  }

  addBusinessSchedule() {
    this.setState({ fieldsCount: this.state.fieldsCount + 1 });
  }

  deleteBusinessSchedule() {
    if (this.state.fieldsCount > 1) {
      this.props.deleteVendorSchedule(this.state.fieldsCount - 1);
      this.setState({ fieldsCount: this.state.fieldsCount - 1 });
    }
  }

  render() {
    let fields = [];

    for (let i = 0; i < this.state.fieldsCount; i++) {
      fields.push(<BusinessSchedule index={i} key={i.toString()} />);
    }
    return (
      <div className="schedule">
        <div>
          {fields}
        </div>
        <div>
          <button onClick={this.addBusinessSchedule.bind(this)} type="button"><i className="fas fa-plus"></i></button>
          <button onClick={this.deleteBusinessSchedule.bind(this)} type="button"><i className="fas fa-minus"></i></button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

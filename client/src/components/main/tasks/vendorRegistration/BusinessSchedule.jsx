import React from 'react';
import Select from 'react-select';

import { addVendorSchedule } from '../../../../actions/vendorsActions';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  addVendorSchedule: (schedule) => dispatch(addVendorSchedule(schedule))
});

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const options = days.map((elem) => {
  return {
    value: String(elem),
    label: elem
  };
});

let daysSelected = {
  selectedOption: null,
};

class BusinessSchedule extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: props.index,
      data: {
        day: '',
        from: '',
        to: ''
      }
    };
  }

  handleDayChange = (e) => {
    daysSelected = { e };
    const newData = this.state.data;
    let daysArray = e.map((elem) => {
      return elem.value;
    });
    this.setState({ data: { ...newData, day: daysArray } });
    const currentState = this.state;
    currentState.data.day = daysArray;
    this.props.addVendorSchedule(currentState);
  }

  handleFromChange = (e) => {
    const newData = this.state.data;
    this.setState({ data: { ...newData, from: e.target.value } });
    const currentState = this.state;
    currentState.data.from = e.target.value;
    this.props.addVendorSchedule(currentState);
  }

  handleToChange = (e) => {
    const newData = this.state.data;
    this.setState({ data: { ...newData, to: e.target.value } });
    const currentState = this.state;
    currentState.data.to = e.target.value;
    this.props.addVendorSchedule(currentState);
  }

  render() {
    const { selectedOption } = daysSelected;

    return (
      <div className="business-schedule">
        <Select
          value={selectedOption}
          onChange={this.handleDayChange.bind(this)}
          options={options}
          placeholder="Day"
          isMulti
        />
        <input type="time" onChange={this.handleFromChange.bind(this)} className="form-control-schedule" placeholder="from" required />
        <input type="time" onChange={this.handleToChange.bind(this)} className="form-control-schedule" placeholder="to" required />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessSchedule);
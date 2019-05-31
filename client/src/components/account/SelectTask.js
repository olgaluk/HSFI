import React from 'react';
import Select from 'react-select';

import { connect } from 'react-redux';
import { addTask } from '../../actions/usersActions';

import './SelectTask.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  addTask: (task) => dispatch(addTask(task))
});

const tasks = ["Vendor registration", "Scratch card desk", "Hotline", "Inspection"];

const options = tasks.map((elem) => {
  return {
    value: String(elem),
    label: elem
  };
});

class SelectTask extends React.Component {
  state = {
    selectedOption: null,
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.addTask(selectedOption.map((elem) => {
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
        placeholder="Task"
        isMulti
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTask);
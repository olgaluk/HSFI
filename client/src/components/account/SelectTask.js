import React from 'react';
import Select from 'react-select';

import './SelectTask.css';

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
    console.log(`Option selected:`, selectedOption);
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

export default SelectTask;
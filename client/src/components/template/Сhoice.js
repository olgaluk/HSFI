import React from 'react';
import Select from 'react-select';

class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      options: '',
      data: props.data,
      multi: props.multi,
      placeholder: props.placeholder,
    };
  }

  componentWillMount() {
    const options = this.state.data.map((elem) => {
      return {
        value: String(elem),
        label: elem
      };
    });
    this.setState({ options });
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    this.props.onSelect(selectedOption);
  }

  render() {
    const { selectedOption, multi, placeholder, options } = this.state;

    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        placeholder={placeholder}
        isMulti={multi}
      />
    );
  }
}

export default Choice;
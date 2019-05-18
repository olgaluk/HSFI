import React from 'react';

import BusinessLocation from './BusinessLocation';

import { connect } from 'react-redux';

import './Location.css';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({

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
        <button onClick={this.addBusinessLocation.bind(this)} type="button">Add</button>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Location);
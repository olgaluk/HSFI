import React, { Component } from 'react';
import { Link } from "react-router-dom";

import axios from 'axios';

import Choice from '../../../template/Сhoice';

import './ViewVendors.css';

import { connect } from 'react-redux';
import { changeIsLogin } from '../../../../actions/usersActions';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeIsLogin: (isLoggedIn) => dispatch(changeIsLogin(isLoggedIn))
});

class ViewVendors extends Component {
  constructor(props) {
    super(props);
    this.resetSearchValues.bind(this);

    this.state = {
      city: [],
      country: [],
      loading: false,
      cities: [],
      countries: [],
      mode: '',
      groups: [],
      oss: '',
      flag: '',
      stars: '',
      vendor: [],
      table: false,
      message: '',
    };
  }

  resetSearchValues() {
    this.setState({
      cities: [],
      countries: [],
      mode: '',
      groups: [],
      oss: '',
      flag: '',
      stars: '',
    });
  }

  showTable() {
    const self = this;
    const {
      cities,
      countries,
      mode,
      groups,
      oss,
      flag,
      stars,
    } = this.state;
    axios.post('/main/inspection/table', {
      cities,
      countries,
      mode,
      groups,
      oss,
      flag,
      stars,
    })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          self.setState({ vendor: response.data });
          self.setState({ table: true });
          self.resetSearchValues();
        }
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          self.props.changeIsLogin('error');
        } else if (error.response.status === 412) {
          self.setState({ vendor: [] });
          self.setState({ table: true });
          self.setState(
            { message: 'No vendors found for this criteria...' });
        } else {
          self.setState({ message: 'This operation is currently unavailable...' });
        }
      });
  }

  showMap() {

  }

  handleCountry = (countryList) => {
    const countries = countryList.map((item) => {
      return item.value;
    })
    this.setState({ countries });
  }

  handleCity = (cityList) => {
    const cities = cityList.map((item) => {
      return item.value;
    })
    this.setState({ cities });
  }

  handleMode(mode) {
    this.setState({ mode: mode.value });
  }

  handleFoodGroup(group) {
    const groups = group.map((item) => {
      return item.value;
    })
    this.setState({ groups });
  }

  handleOssChange(e) {
    this.setState({ oss: e.target.value.toString() });
  }

  handleQualityStarsChange(e) {
    this.setState({ stars: e.target.value.toString() });
  }

  handleRedFlagChange() {
    const inputWithFlag = document.querySelector('.red-flag input:checked');
    if (inputWithFlag) {
      this.setState({ flag: inputWithFlag.value });
    }
  }

  comeBack() {
    this.setState({ table: false });
    this.setState({ message: '' });
    this.resetSearchValues();
  }

  componentWillMount() {
    const self = this;
    Promise.all([
      axios.get(`/main/inspection/city`),
      axios.get(`/main/inspection/country`)
    ])
      .then(function (response) {
        let city = [];
        let country = [];
        response.forEach((item) => {
          if (item.data.city) {
            city = item.data.city;
          }
          if (item.data.country) {
            country = item.data.country;
          }
        })
        self.setState({ city });
        self.setState({ country });
        self.setState({ loading: true });
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          self.props.changeIsLogin('error');
        } else {
          self.setState({ loading: true });
          self.setState({
            message: 'This operation is currently unavailable...',
          });
        }
      });
  }

  render() {
    let page;
    const tableRow = [];
    this.state.vendor.forEach((item, index) => {
      tableRow.push(
        <tr key={index.toString()}>
          <td>{index + 1}</td>
          <td>{item.vendorName}</td>
          <td>{item.country.join(', ')}</td>
          <td>{item.location.map((item) => item.city).join(', ')}</td>
          <td>{item.foodGroup}</td>
        </tr>
      );
    });

    if (!this.state.loading) {
      page = <div>
        <h2>Loading...</h2>
      </div>;
    } else if (this.state.loading && !this.state.table) {
      page = <div className="view">
        <div className="view-сhoice">
          <button type="button" onClick={this.showTable.bind(this)}>TABLE</button>
          <button type="button" onClick={this.showMap.bind(this)}>MAP</button>
        </div>
        <h3>{this.state.message}</h3>

        <form className="form-view">
          <h3 className="view-heading">Filter by</h3>
          <Choice onSelect={this.handleCountry.bind(this)} data={this.state.country} multi={true} placeholder="Country" />
          <Choice onSelect={this.handleCity.bind(this)} data={this.state.city} multi={true} placeholder="City" />
          <Choice onSelect={this.handleMode.bind(this)} data={['Open', 'Closed']} multi={false} placeholder="Open / Closed" />
          <Choice onSelect={this.handleFoodGroup.bind(this)} data={['A', 'B', 'C']} multi={true} placeholder="Food group" />

          <input type="number" onChange={this.handleOssChange.bind(this)} className="form-control-view" placeholder="OSS" />

          <div className="red-flag" onChange={this.handleRedFlagChange.bind(this)}>
            <p>Red Flag</p>
            <div>
              <input value="Y" type="radio" name="flag" />
              <input value="N" type="radio" name="flag" />
            </div>
          </div>

          <input type="number" onChange={this.handleQualityStarsChange.bind(this)} className="form-control-view" placeholder="No. of quality stars" />
        </form>
        <div>
          <Link to="/main/inspection"><button type="button">{"inspection".toUpperCase()}</button></Link>
        </div>
      </div>
    } else if (this.state.loading && this.state.table) {
      page = <div className="view">
        <div className="view-сhoice">
          <button type="button">MAP</button>
        </div>
        <h3>{this.state.message}</h3>
        <table>
          <thead>
            <tr>
              <td>№</td>
              <td>Vendor Name</td>
              <td>Country</td>
              <td>City</td>
              <td>Food group</td>
            </tr>
          </thead>
          <tbody>
            {tableRow}
          </tbody>
        </table>
        <button type="button" onClick={this.comeBack.bind(this)}>{"back".toUpperCase()}</button>
        <div>
          <Link to="/main/inspection"><button type="button">{"inspection".toUpperCase()}</button></Link>
        </div>
      </div>
    }

    return (
      <div>
        {page}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewVendors);
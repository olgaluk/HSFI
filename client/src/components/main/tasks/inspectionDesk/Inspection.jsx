import React from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import './Inspection.css';

import questions from './questions.json';

import { changeIsLogin } from '../../../../actions/usersActions';

import { connect } from 'react-redux';

import MyMapComponent from './MyMapComponent';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeIsLogin: (isLoggedIn) => dispatch(changeIsLogin(isLoggedIn))
});

class Inspection extends React.Component {
  constructor(props) {
    super(props);
    this.register = this.register.bind(this);

    this.state = {
      vendorId: '',
      operatorName: '',
      date: '',
      licenseNumber: '',
      vendorName: '',
      foodGroup: '',
      locationValue: 'GPSlocation',
      latitude: '',
      longitude: '',
      map: false,
      oss: 'Overall Safety Score OSS',
      questions: '',

      message: '',
      isRegistered: false,
    };
  }

  addVendorName(name) {
    this.setState({ vendorName: name });
  }

  addFoodGroup(group) {
    this.setState({ foodGroup: group });
  }

  handleLicenseNumberChange(e) {
    this.addVendorName('');
    this.addFoodGroup('');
    const number = e.target.value;
    if (number.length === 6) {
      this.setState({ licenseNumber: number });
      const self = this;
      axios.get(`/main/scratch-card?licenseNumber=${number}`)
        .then(function (response) {
          console.log(response.data);
          if (response.status === 200) {
            self.addVendorName(response.data.vendorName);
            self.addFoodGroup(response.data.foodGroup);
            self.setState({ vendorId: response.data._id });
          }
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            self.props.changeIsLogin('error');
          }
        });
    }
  }

  componentWillMount() {
    const date = new Date();
    this.setState({
      date: date
    });
    setTimeout(() => this.setState({ operatorName: this.props.users.name }), 0);
  }

  register() {
    const self = this;
    const {
      vendorName,
      vendorId,
      operatorName,
      date,
      licenseNumber,
      latitude,
      longitude,
      oss,
      questions,
    } = this.state;
    if (vendorName &&
      licenseNumber.length === 6 &&
      latitude &&
      longitude &&
      oss !== 'Overall Safety Score OSS' &&
      questions
    ) {
      axios.post('/main/inspection/questions', {
        vendorId,
        operatorName,
        date,
        licenseNumber,
        latitude,
        longitude,
        oss,
        questions,
      })
        .then(function (response) {
          console.log(response);
          if (response.status === 201) {
            self.setState({
              vendorId: '',
              licenseNumber: '',
              vendorName: '',
              foodGroup: '',
              locationValue: 'GPSlocation',
              latitude: '',
              longitude: '',
              map: false,
              oss: 'Overall Safety Score OSS',
              questions: '',
              message: 'Inspection report successfully registered!',
              isRegistered: true,
            });
          }
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            self.props.changeIsLogin('error');
          } else {
            self.setState({
              message: 'Check the correctness of the entered data!',
            });
          }
        });
    } else {
      self.setState({
        message: 'Check the correctness of the entered data!',
      });
    }
  }

  showForm() {
    this.setState({
      message: '',
      isRegistered: false
    });
  }

  findLocation() {
    const success = function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      this.setState({ locationValue: `Latitude: ${latitude} °, Longitude: ${longitude} °` });
      this.setState({ latitude, longitude });
    }

    const error = function () {
      this.setState({ locationValue: 'Unable to retrieve your location' });
    }

    if (!navigator.geolocation) {
      this.setState({ locationValue: 'Geolocation is not supported by your browser' });
    } else {
      this.setState({ locationValue: 'Locating…' });
      navigator.geolocation.getCurrentPosition(success.bind(this), error.bind(this));
    }
  }

  showLocation() {
    if (this.state.longitude && this.state.latitude) {
      this.setState({ map: true });
    }
  }

  hideLocation() {
    this.setState({ map: false });
  }

  showOss() {
    this.setState({ oss: 'Overall Safety Score OSS' });
    const questionInput = document.querySelectorAll('.inspection-question input:checked');
    if (questionInput.length === questions.length) {
      const questionAll = [];
      const oss = Array.from(questionInput)
        .map((item, index) => {
          const question = {
            questionText: questions[index],
            questionAnswer: item.value,
          }
          questionAll.push(question);
          return parseInt(item.value, 10);
        })
        .reduce((acc, item) => acc + item, 0);
      this.setState({ questions: questionAll });
      this.setState({ oss });
    }
  }

  render() {
    let fields = [];

    for (let i = 0; i < questions.length; i++) {
      fields.push(<div key={i.toString()}>
        <p>{questions[i]}</p>
        <div>
          <input value="1" type="radio" name={`question${i}`} />
          <input value="-1" type="radio" name={`question${i}`} />
        </div>
      </div>);
    };

    let page;

    if (this.state.isRegistered && !this.state.map) {
      page = <div>
        <h2>{this.state.message}</h2>
        <button onClick={this.showForm.bind(this)} type="button">{'back to register'.toLocaleUpperCase()}</button>
      </div>;
    } else if (!this.state.isRegistered && !this.state.map) {
      page = <div className="inspection">
        <h2>Please fill out the form</h2>
        <h3>{this.state.message}</h3>
        <form className="form-inspection">
          <h3 className="inspection-heading">Inspection form</h3>
          <p><b>Operator's name:</b> {this.state.operatorName}</p>
          <p><b>Inspection date:</b> {this.state.date.toDateString()}</p>
          <input type="text" pattern="[0-9]{6}" onChange={this.handleLicenseNumberChange.bind(this)} className="form-control-inspection" placeholder="License number (6 symbols)" required />
          <p><b>Vendor's name:</b> {this.state.vendorName}</p>
          <p><b>Food group:</b> {this.state.foodGroup}</p>

          <div className="inspection-location">
            <p>{this.state.locationValue}</p>
            <button type="button" onClick={this.findLocation.bind(this)}><i className="fas fa-search-location"></i></button>
            <button type="button" onClick={this.showLocation.bind(this)}><i className="far fa-map"></i></button>
          </div>

          <fieldset className="inspection-question" onChange={this.showOss.bind(this)}>
            <legend>Please answer the questions:</legend>
            {fields}
          </fieldset>

          <p className="inspection-oss">{this.state.oss}</p>
        </form>
        <button onClick={this.register} type="button">Register</button>
      </div>
    } else if (!this.state.isRegistered && this.state.map) {
      page = <div className="inspection">
        <MyMapComponent lat={this.state.latitude} lng={this.state.longitude} />
        <button onClick={this.hideLocation.bind(this)} type="button">{'back'.toLocaleUpperCase()}</button>
      </div>;
    }

    return (
      <div>
        <div>
          <Link to="/main/inspection/view-vendors"><button type="button">View Vendors</button></Link>
        </div>
        {page}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inspection);
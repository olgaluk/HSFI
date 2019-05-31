import React from 'react';
import Select from 'react-select';
import axios from 'axios';

import './ScratchCard.css';

import { connect } from 'react-redux';

import currencies from './currencies.json';

import { changeIsLogin } from '../../../../actions/usersActions';

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  changeIsLogin: (isLoggedIn) => dispatch(changeIsLogin(isLoggedIn))
});

const options = currencies.map((elem) => {
  return {
    value: String(elem.name),
    label: elem.symbol
  };
});

let currencySelected = {
  selectedOption: null,
};

class ScratchCard extends React.Component {
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
      quantity: null,
      serialNumber: '',
      costCard: {
        value: null,
        currency: ''
      },
      message: '',
      isRegistered: false,
      costAllCards: '',
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
    this.setState({ serialNumber: '' });
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
          axios.get(`/main/scratch-card?vendorId=${response.data._id}&licenseNumber=${number}`)
            .then(function (response) {
              console.log(response.data);
              self.setState({ serialNumber: response.data });
            })
            .catch(function (error) {
              if (error.response.status === 401) {
                self.props.changeIsLogin('error');
              }
              console.log(error);
            });
        })
        .catch(function (error) {
          if (error.response.status === 401) {
            self.props.changeIsLogin('error');
          }
          console.log(error);
        });
    }
  }

  handleQuantityChange(e) {
    this.setState({ costAllCards: '' });
    this.setState({ quantity: +e.target.value });
  }

  handleCostCardChange(e) {
    this.setState({ costAllCards: '' });
    const newDataCostCard = this.state.costCard;
    this.setState({ costCard: { ...newDataCostCard, value: e.target.value } });
  }

  handleCurrencyChange = (e) => {
    this.setState({ costAllCards: '' });
    currencySelected = { e };
    const newData = this.state.costCard;
    this.setState({ costCard: { ...newData, currency: e.label } });
  }

  componentWillMount() {
    const date = new Date();
    this.setState({
      date: date
    });
    setTimeout(() => this.setState({ operatorName: this.props.users.name }), 0);
  }

  componentDidUpdate() {
    const { licenseNumber, quantity, serialNumber, costCard, costAllCards } = this.state;
    if (!costAllCards) {
      if (licenseNumber && quantity && serialNumber && costCard.value && costCard.currency) {
        this.setState({
          costAllCards: `Cost of all cards: ${quantity * costCard.value} ${costCard.currency}`
        });
      }
    }
  }

  register() {
    const self = this;
    const { vendorId, operatorName, date, quantity, serialNumber, costCard } = this.state;
    axios.post('/main/scratch-card', {
      vendorId,
      operatorName,
      date,
      quantity,
      serialNumber,
      costCard,
    })
      .then(function (response) {
        console.log(response);
        if (response.status === 201) {
          self.setState({
            vendorId: '',
            licenseNumber: '',
            vendorName: '',
            foodGroup: '',
            quantity: null,
            serialNumber: '',
            costCard: {
              value: null,
              currency: ''
            },
            message: 'Cards successfully registered!',
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
  }

  showForm() {
    this.setState({
      message: '',
      isRegistered: false
    });
  }

  render() {
    let page;
    const { selectedOption } = currencySelected;

    if (this.state.isRegistered) {
      page = <div>
        <h2>{this.state.message}</h2>
        <button onClick={this.showForm.bind(this)} type="button">{'back to register'.toLocaleUpperCase()}</button>
      </div>;
    } else {
      page = <div className="scratch-card">
        <h2>Please fill out the form</h2>
        <h3>{this.state.message}</h3>
        <form className="form-scratch-card">
          <h3 className="scratch-card-heading">Transaction form</h3>
          <p><b>Operator's name:</b> {this.state.operatorName}</p>
          <p><b>Transaction date:</b> {this.state.date.toDateString()}</p>
          <input type="text" pattern="[0-9]{6}" onChange={this.handleLicenseNumberChange.bind(this)} className="form-control-scratch" placeholder="License number (6 symbols)" required />
          <p><b>Vendor's name:</b> {this.state.vendorName}</p>
          <p><b>Food group:</b> {this.state.foodGroup}</p>
          <input type="number" onChange={this.handleQuantityChange.bind(this)} className="form-control-scratch" placeholder="Quantity of cards" required />
          <p><b>First card's serial no.:</b> {this.state.serialNumber}</p>
          <div className="cost-card">
            <input type="number" onChange={this.handleCostCardChange.bind(this)} className="form-control-scratch" placeholder="Cost per card" required />
            <Select value={selectedOption} onChange={this.handleCurrencyChange.bind(this)} options={options} placeholder="Currency" />
          </div>
        </form>
        <button onClick={this.register} type="button">Register</button>
        <div className="cost-card_all"><h3>{this.state.costAllCards}</h3></div>
      </div>
    }

    return (
      <div>
        {page}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScratchCard);
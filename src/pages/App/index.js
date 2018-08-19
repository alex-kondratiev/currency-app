import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchRates,
  updateRate,
} from '~/middleware/resourses/currency';
import {
  addCurrency,
  toggleAddCurrencyModal,
  removeCurrency,
} from '~/store/currency/actions';
import {
  getRates,
  getCurrencies,
  getCurrenciesToAdd,
  getIsModalOpen,
} from '~/store/currency/selectors';
import CurrencyList from '~/components/CurrencyList';
import AddCurrencyModal from '~/components/AddCurrencyModal';
import { TIMER } from '~/consts';

import './index.scss';


class App extends React.Component {
  static propTypes = {
    isModalOpen: PropTypes.bool,
    rates: PropTypes.array,
    currenciesToAdd: PropTypes.array,
    toggleAddCurrencyModal: PropTypes.func,
    removeCurrency: PropTypes.func,
    updateRate: PropTypes.func,
    addCurrency: PropTypes.func,
  };

  static defaultProps = {
    isModalOpen: false,
    rates: [],
    currenciesToAdd: [],
    toggleAddCurrencyModal: () => {},
    removeCurrency: () => {},
    updateRate: () => {},
    addCurrency: () => {},
  };


  timer = null;

  componentDidMount() {
    this.fetchRates();
    this.timer = setInterval(()=>{this.fetchRates()}, TIMER);
  };

  componentWillUnmount(){
    if (this.timer){
      clearInterval(this.timer);
    }
  }

  fetchRates = () => {
    const currencies = this.props.currencies;
    this.props.fetchRates(currencies);
  };

  render() {
    const {
      rates, addCurrency, toggleAddCurrencyModal, isModalOpen, currenciesToAdd,
      removeCurrency, updateRate,
    } = this.props;
    return (
      <div className="app">
        <CurrencyList
          rates={rates}
          removeCurrency={removeCurrency}
          updateRate={updateRate}
          fetchRates={this.fetchRates}
        />
        <AddCurrencyModal
          isModalOpen={isModalOpen}
          toggleModal={toggleAddCurrencyModal}
          addCurrency={addCurrency}
          currenciesToAdd={currenciesToAdd}
          fetchRates={this.fetchRates}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isModalOpen: getIsModalOpen(state),
    rates: getRates(state),
    currencies: getCurrencies(state),
    currenciesToAdd: getCurrenciesToAdd(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRates: (currencies) => dispatch(fetchRates(currencies)),
    updateRate: (currency) => dispatch(updateRate(currency)),
    addCurrency: (currency) => dispatch(addCurrency(currency)),
    removeCurrency: (currency) => dispatch(removeCurrency(currency)),
    toggleAddCurrencyModal: (value) => dispatch(toggleAddCurrencyModal(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

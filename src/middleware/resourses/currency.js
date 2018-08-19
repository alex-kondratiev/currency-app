import axios from 'axios';
import {
  fetchRatesRequest,
  fetchRatesSuccess,
  fetchRatesFailure,
  updateRateRequest,
  updateRateSuccess,
  updateRateFailure,
} from '~/store/currency/actions';
import {
  DEFAULT_CURRENCIES,
  BASE_CURRENCY,
  API_CURRENCY,
  MY_ID,
  API,
} from '~/consts';

export function fetchRates(currencies) {
  return async (dispatch) => {
    try {
      dispatch(fetchRatesRequest());
      const { data } = await axios.get(API.FETCH_LATEST_EXCHANGE_RATES, {
        params: {
          app_id: MY_ID,
          symbols: currencies.join(','),
          base: BASE_CURRENCY,
        }
      });
      if (data) {
        const ratesArr = [];
        for (let key in data.rates) {
          if( data.rates.hasOwnProperty(key) ) {
            ratesArr.push({
              key,
              value: data.rates[key],
              timestamp: new Date() / 1000,
              default: DEFAULT_CURRENCIES.find(item => item === key),
            })
          }
        }
        dispatch(fetchRatesSuccess(ratesArr));
      }
    } catch(error) {
      dispatch(fetchRatesFailure());
    }
  }
}

export function updateRate(currency) {
  return async (dispatch) => {
    try {
      dispatch(updateRateRequest());
      const { data } = await axios.get(API.FETCH_LATEST_EXCHANGE_RATES, {
        params: {
          app_id: MY_ID,
          symbols: currency,
          base: BASE_CURRENCY,
        }
      });
      if (data) {
        const ratesArr = [];
        for (let key in data.rates) {
          if( data.rates.hasOwnProperty(key) ) {
            ratesArr.push({
              key,
              value: data.rates[key],
              timestamp: new Date() / 1000,
              default: DEFAULT_CURRENCIES.find(item => item === key),
            })
          }
        }
        dispatch(updateRateSuccess(ratesArr[0]));
      }
    } catch(error) {
      dispatch(updateRateFailure());
    }
  }
}

import axios from 'axios';
import * as TYPE from "~/store/currency/type";


export function fetchRatesRequest() {
  return {
    type: TYPE.FETCH_RATES_REQUEST,
  }
}

export function fetchRatesSuccess(payload) {
  return {
    type: TYPE.FETCH_RATES_SUCCESS,
    payload,
  }
}

export function fetchRatesFailure() {
  return {
    type: TYPE.FETCH_RATES_FAILURE,
  }
}

export function updateRateRequest() {
  return {
    type: TYPE.UPDATE_RATE_REQUEST,
  }
}

export function updateRateSuccess(payload) {
  return {
    type: TYPE.UPDATE_RATE_SUCCESS,
    payload,
  }
}

export function updateRateFailure() {
  return {
    type: TYPE.UPDATE_RATE_FAILURE,
  }
}

export function addCurrency(payload) {
  return {
    type: TYPE.ADD_CURRENCY,
    payload,
  }
}

export function removeCurrency(payload) {
  return {
    type: TYPE.REMOVE_CURRENCY,
    payload,
  }
}

export function toggleAddCurrencyModal(payload) {
  return {
    type: TYPE.TOGGLE_ADD_CURRENCY_MODAL,
    payload,
  }
}

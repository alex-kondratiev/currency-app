import { createSelector } from 'reselect';

const getCurrency = (state) => state.currency;

export const getRates = createSelector(
  getCurrency,
  currency => currency.rates,
);

export const getCurrencies = createSelector(
  getCurrency,
  currency => currency.currencies,
);

export const getCurrenciesToAdd = createSelector(
  getCurrency,
  currency => currency.currenciesToAdd,
);

export const getIsModalOpen = createSelector(
  getCurrency,
  currency => currency.isModalOpen,
);

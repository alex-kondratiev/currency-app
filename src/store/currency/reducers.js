import * as TYPE from './type';

export const initialState = {
  isModalOpen: false,
  currencies: ['USD', 'EUR'],
  rates: [],
  currenciesToAdd: ['CAD', 'JPY'],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.FETCH_RATES_REQUEST:
      return state;
    case TYPE.FETCH_RATES_SUCCESS:
      return {...state, rates: action.payload };
    case TYPE.FETCH_RATES_FAILURE:
      return state;
    case TYPE.UPDATE_RATE_REQUEST:
      return state;
    case TYPE.UPDATE_RATE_SUCCESS:
      return {
        ...state,
        rates: [
          ...state.rates.filter(item => item.key !== action.payload.key),
          action.payload,
        ],
      };
    case TYPE.UPDATE_RATE_FAILURE:
      return state;
    case TYPE.ADD_CURRENCY:
      return {
        ...state,
        currencies: [...state.currencies, action.payload ],
        currenciesToAdd: state.currenciesToAdd.filter(item => item !== action.payload),
      };
    case TYPE.REMOVE_CURRENCY:
      return {
        ...state,
        currencies: state.currencies.filter(item => item !== action.payload),
        currenciesToAdd: [...state.currenciesToAdd, action.payload ],
      };
    case TYPE.TOGGLE_ADD_CURRENCY_MODAL: {
      return {
        ...state,
        isModalOpen: action.payload,
      };
    }
    default:
      return state;
  }
}

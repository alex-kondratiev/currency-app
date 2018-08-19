import { combineReducers } from 'redux';
import currency from './currency/reducers';

const rootReducers = combineReducers({
  currency,
});

export default rootReducers;

import { combineReducers } from 'redux';

import quotesReducer from './quotes/quotes.reducer';

export default combineReducers({
    quote: quotesReducer,
});
import { QuotesActionTypes } from './quotes.types';

export const toggleFavorite = () => ({
    type: QuotesActionTypes.TOGGLE_FAVORITE,
});

export const addQuote = quote =>{
    // const jsonQuote = JSON.stringify(quote);
    // localStorage.setItem(quote.id, jsonQuote);
    
    return {
        type: QuotesActionTypes.ADD_QUOTE,
        payload: quote
    }
};

export const removeQuote = quote => ({
    type: QuotesActionTypes.REMOVE_QUOTE,
    payload: quote
})
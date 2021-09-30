
import { useState } from "react";
import { TOGGLE_FAVORITE } from "../actions/quotes";


const initialState = {
    quotes: [],
    favoriteQuotes: [],
}

const quotesReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const existingIndex = state.favoriteQuotes.findIndex(quote => quote.id === action.quoteId)
            if (existingIndex >= 0) {
                const updatedFavQuotes = [...state.favoriteQuotes];
                updatedFavQuotes.splice(existingIndex, 1)
                return { ...state, favoriteQuotes: updatedFavQuotes }
            }else {
                const quote = state.quotes.find(quote => quote.id === action.quoteId)
                return { ...state, favoriteQuotes: state.favoriteQuotes.concat(quote) }
            }
            default:
                return state
        }
}

export default quotesReducer;
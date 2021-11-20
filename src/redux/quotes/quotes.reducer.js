import { QuotesActionTypes } from "./quotes.types"
import { addQuoteToFavorite, removeQuoteFromFavorites } from "./quotes.utils";

export const initialState = {
    marked: false,
    quotes: [],
};

const quotesReducer = (state = initialState, action) => {
    switch(action.type) {
        case QuotesActionTypes.TOGGLE_FAVORITE:
        return {
            ...state,
            marked: !state.marked
        };
        case QuotesActionTypes.ADD_QUOTE: // TODO: Verify why it is valling undefined
            return {
                ...state,
                quotes: addQuoteToFavorite(state.quotes, action.payload)
            }
            case QuotesActionTypes.REMOVE_QUOTE:
                return {
                    ...state,
                    quotes: removeQuoteFromFavorites(state.quotes, action.payload)
                }
        default:
        return state;
    }
}

export default quotesReducer;
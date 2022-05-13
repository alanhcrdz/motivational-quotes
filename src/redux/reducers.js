import { ADD_TO_FAVORITES, GET_QUOTES, REMOVE_FROM_FAVORITES } from "./actions";

const initialState = {
  quotes: [],
  favorites: [],
};

function quotesReducer(state = initialState, action) {
  switch (action.type) {
    case GET_QUOTES:
      return {
        ...state,
        quotes: action.payload
      }
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (quote) => quote.key != action.payload.key
        ),
      };

    default:
      return state;
  }
}

export default quotesReducer;

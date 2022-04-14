import { ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "./actions";

const initialState = {
  // quotes: [],
  favorites: [],
};

function quotesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          (picture) => picture.id != action.payload.id
        ),
      };

    default:
      return state;
  }
}

export default quotesReducer;

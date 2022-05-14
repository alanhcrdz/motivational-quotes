import { getFirestore, collection, getDocs } from "firebase/firestore";

export const GET_QUOTES = "GET_QUOTES";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";
// get
export const getQuotes = () => async (dispatch) => {
  const db = getFirestore();
  let listQuotes = [];
  const querySnapshot = await getDocs(collection(db, "quotes"));
  querySnapshot.forEach((doc) => {
    listQuotes.push({
      ...doc.data(),
      key: doc.id,
    });
  });
  dispatch({
    type: GET_QUOTES,
    payload: listQuotes,
  });
};
// handle favorites
// add
export const addFavorite = (quote) => (dispatch) => {
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: quote,
  });
};

// remove
export const removeFavorite = (quote) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_FAVORITES,
    payload: quote,
  });
};

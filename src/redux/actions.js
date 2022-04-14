import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  memo,
  useRef,
} from "react";

export const GET_QUOTES = "GET_QUOTES";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES";

// get

// handle favorites
// add
export const addFavorite = (picture) => (dispatch) => {
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: picture,
  });
};

// remove
export const removeFavorite = (picture) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_FAVORITES,
    payload: picture,
  });
};

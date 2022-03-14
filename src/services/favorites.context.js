import React, { useState, useEffect, createContext } from "react";

export const FavoritesContext = createContext();

export const FavoritesContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const add = (quote) => {
    setFavorites([...favorites, quote]);
  };

  const remove = (quote) => {
    const newFavorites = favorites.filter((x) => x.quoteId !== quote.quoteId);
    setFavorites(newFavorites);
  };

  /*  const loadFavorites = async () => {
        try {
            const value = await A
        } catch(e) {
            console.log(e)
        }
    } */

  return (
    <FavoritesContextProvider
      value={{
        favorites,
        addToFavorites: add,
        removeFromFavorites: remove,
      }}
    >
      {children}
    </FavoritesContextProvider>
  );
};

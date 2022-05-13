import React, { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import { format } from "date-fns";


const Context = createContext();

export function DataContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [adLoading, setAdLoading] = useState(false);


  const today = format(new Date(), "eeee");

  // FAVORITES FEATURE
  const [favorites, setFavorites] = useState([]);
  const add = (picture) => {
    setFavorites([...favorites, picture]); // current favorites + our quote
    console.log(favorites);
  };
  const remove = (picture) => {
    const newFavorites = favorites.filter((x) => x.id !== picture.id);
    setFavorites(newFavorites);
  };
  

  /* async function loadRandomQuotes() {
    setLoading(true);
    await api
      .get("/quotes")
      .then((res) => {
        let data = res.data;
        let randomNumber = Math.floor(Math.random() * data.length);
        let randomQuote = data[randomNumber];
        setRandomQuotes(randomQuote);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  } */
  /* useEffect(() => {
    loadRandomQuotes();
  }, []); */

  return (
    <Context.Provider
      value={{
        loading,
        adLoading,
        setAdLoading,
        today,
        setLoading,
        favorites,
        addToFavorites: add,
        removeFromFavorites: remove,
        
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useDataContext() {
  const context = useContext(Context);
  return context;
}

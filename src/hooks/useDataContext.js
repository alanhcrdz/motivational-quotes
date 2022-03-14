import React, { useContext } from "react";
import { createContext, useState, useEffect } from "react";
import { format } from "date-fns";
import Constants from "expo-constants";
import { AdMobRewarded, AdMobInterstitial } from "expo-ads-admob";
import { api } from "../services/api";

const Context = createContext();

export function DataContextProvider({ children }) {
  const [quotes, setQuotes] = useState([]);
  const [randomQuotes, setRandomQuotes] = useState([]);
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

  // interstitial
  /* const productionInterIos = "ca-app-pub-9871106933538473/5497945163";
  const testInterIos = "ca-app-pub-3940256099942544/4411468910";

  const productionInterAndroid = "ca-app-pub-9871106933538473/2193673059";
  const testInterAndroid = "ca-app-pub-3940256099942544/1033173712";

  const interstitialUnit = Platform.select({
    ios: Constants.isDevice && !__DEV__ ? productionInterIos : testInterIos,
    android:
      Constants.isDevice && !__DEV__
        ? productionInterAndroid
        : testInterAndroid,
  });
  function showInterstitial() {
    setAdLoading(true);
    AdMobInterstitial.setAdUnitID(interstitialUnit);
    AdMobInterstitial.requestAdAsync().then(() => {
      AdMobInterstitial.showAdAsync().catch((e) => {
        console.log(e);
      });
    });
    setAdLoading(false);
  } */

  /* End of Favorites. Next step: 
  - pass to children
  - Wrapp App.js with provider; 
  - Go to Details screen and console.log to see the favorites array; 
  */

  /*  async function loadQuotes  (){
        setLoading(true);
         await api.get('/quotes')
        .then(res => {
            //setQuotes(res.data)
                setQuotes(res.data); 
           })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {setLoading(false)});
        }
         
        useEffect(() => {
            loadQuotes();
        }, []) */

  async function loadRandomQuotes() {
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
  }
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
        quotes,
        setQuotes,
        loadRandomQuotes,
        randomQuotes,
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

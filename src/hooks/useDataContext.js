import React,{  useContext } from "react";
import { createContext, useState, useEffect } from "react"
import { api } from "../services/api";
import { format } from 'date-fns';


const Context = createContext();

export function DataContextProvider({ children }) {
    const [quotes, setQuotes] = useState([]);
    //const [randomQuotes, setRandomQuotes] = useState([])
    const [loading, setLoading] = useState(false);
    const today = format(new Date(), 'eeee')

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
        }, [])

        async function loadRandomQuotes  (){
            setLoading(true);
             await api.get('/quotes')
            .then((res) => {
                let  data  = res.data
                  let randomNumber = Math.floor((Math.random() * data.length) )
                let randomQuote = data[randomNumber];
                setRandomQuotes(randomQuote); 
               })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {setLoading(false)});
            }
            useEffect(() => {
                loadRandomQuotes()
            },[])
              */
           
        

    return (
        <Context.Provider value={{ 
            loading,
            today,
            setLoading,
            quotes,
            setQuotes,
        }}
        >
            {children}
        </Context.Provider>
    )

}

export function useDataContext () {
    const context = useContext(Context);
    return context
}
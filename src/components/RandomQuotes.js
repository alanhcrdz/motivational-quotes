import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { useDataContext } from '../hooks/useDataContext';
import { api } from '../services/api';
import ActionButton from './ActionButton';


function RandomQuotes() {
    const { loading, setLoading } = useDataContext();
    const [randomQuotes, setRandomQuotes] = useState([])

    function loadRandomQuotes() {
        setLoading(true);
        api.get('/quotes')
            .then((res) => {
                let data = res.data
                let randomNumber = Math.floor((Math.random() * data.length))
                let randomQuote = data[randomNumber];
                setRandomQuotes(randomQuote);
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => { setLoading(false) });
    }

    useEffect(() => {
        loadRandomQuotes()
    }, [])

    return (
        <>
            {loading ?
                <View style={styles.spinner}>
                    <ActivityIndicator size="small" color={colors.white} />
                </View>

                :
                <View style={styles.card}>
                    {/* <Text style={styles.date}>{today}</Text> */}
                    <Entypo name="quote" size={34} color={colors.opacityWhite} />
                    <Text style={styles.text} >"{randomQuotes.content}"</Text>
                    <View style={styles.wrapper} >
                        <Text style={styles.author}> - {randomQuotes.author}</Text>
                        <TouchableOpacity onPress={loadRandomQuotes} activeOpacity={0.6}>
                            <Foundation name="refresh" size={28} color="#F3EAC0" />
                        </TouchableOpacity>
                    </View>

                </View>

            }
            

        </>
    )
}
const styles = StyleSheet.create({
    /*  date: {
         fontSize: 18,
         fontFamily: fonts.title,
         color:  colors.white,
     }, */
    spinner: {
        marginTop: 40,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignSelf: 'center',
        backgroundColor: colors.opacityWhite,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '96%',
        marginTop: 40,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.opacityWhite,
    },
    wrapper: {
        marginTop: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
        fontFamily: fonts.text,
        color: colors.white,
        textAlign: 'left',
    },
    author: {
        fontSize: 17,
        fontFamily: fonts.text,
        color: colors.accent,

    },
    
})
export default RandomQuotes;

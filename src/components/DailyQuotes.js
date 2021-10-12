/* import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { useDataContext } from '../hooks/useDataContext';
import { api } from '../services/api';


function DailyQuotes() {
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
                    <Entypo name="quote" size={34} color={colors.opacityWhite} />
                    <Text style={styles.text} >"{randomQuotes.content}"</Text>
                    <View style={styles.wrapper} >
                        <Text style={styles.author}> - {randomQuotes.author}</Text>
                    </View>
                    <View>
                        <Text style={styles.timer}>Next quote in 23:55:00</Text>
                    </View>

                </View>

            }
            

        </>
    )
}
const styles = StyleSheet.create({
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
    timer: {
        marginTop: 10,
        fontFamily: fonts.title,
        color: colors.primary,
    }
    
})
export default DailyQuotes;
 */
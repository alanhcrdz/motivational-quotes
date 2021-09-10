import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { Entypo } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { useDataContext } from '../hooks/useDataContext';


function DailyCard() {
const { loading,  today } = useDataContext();

    

    return (
       <>
       {loading ? 
       <View style={styles.card}>
           <ActivityIndicator size="small" color={colors.white} />
       </View>
       
        :
        <View style={styles.card}>
            <Text style={styles.date}>{today}</Text>
            <Entypo name="quote" size={34} color={colors.opacityWhite} />
            <Text style={styles.text} >"{randomQuotes.content}"</Text>
            <View style={styles.wrapper} >
                <Text style={styles.author}> - {randomQuotes.author}</Text>
                <TouchableOpacity onPress={loadRandomQuotes} activeOpacity={0.6}>
                <Foundation  name="refresh" size={28} color="#F3EAC0" />
                </TouchableOpacity>
            </View>
            
        </View> 
    }
          
       </>
    )
}
const styles = StyleSheet.create({
    date: {
        fontSize: 18,
        fontFamily: fonts.title,
        color:  colors.white,
    },
    card: {
        marginTop: 10,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'flex-start',
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
        marginTop: 10,
        textAlign: 'left',
    },
    author: {
        fontSize: 17,
        fontFamily: fonts.text,
        color: colors.accent,

    },
})
export default DailyCard;

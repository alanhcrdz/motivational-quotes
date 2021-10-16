import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Modal, Alert, TouchableHighlight } from 'react-native';
import RandomQuotes from '../components/RandomQuotes';
import colors from '../constants/colors';
import { AdMobInterstitial, AdMobRewarded, setTestDeviceIDAsync } from "expo-ads-admob";
import Constants from 'expo-constants';
import fonts from '../constants/fonts';
import { AntDesign } from '@expo/vector-icons';
import BannerAd from '../components/ads/BannerAd';



function Random({ navigation }) {
    
    return (
        <>
            <View style={styles.container}>
                <RandomQuotes />
            </View>
            <View style={styles.adContainer}>

                <BannerAd />
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: colors.background,
    },
    adContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontFamily: fonts.title,
        fontSize: 23,
        color: colors.primary,
    },
    button: {
        width: 250,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: colors.action,
    },
    ctaText: {
        fontSize: 18,
        fontFamily: fonts.title,
        color: colors.white,
        textTransform: 'uppercase',
    },

    // MODAL STYLE
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

export default Random;

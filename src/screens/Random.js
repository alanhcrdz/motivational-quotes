import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Modal, Alert, TouchableHighlight } from 'react-native';
import RandomQuotes from '../components/RandomQuotes';
import colors from '../constants/colors';
import { AdMobInterstitial, AdMobRewarded, setTestDeviceIDAsync } from "expo-ads-admob";
import Constants from 'expo-constants';
import fonts from '../constants/fonts';
import { AntDesign } from '@expo/vector-icons';
import BannerAd from '../components/ads/BannerAd';

// BANNER ANDROID ID: ca-app-pub-3940256099942544/6300978111 (TEST ID, REPLACE AFTER)
// INTERSTITIAL ANDROID ID: ca-app-pub-3940256099942544/1033173712 (TEST ID, REPLACE AFTER)
// INTERSTITIAL VIDEO ANDROID ID: ca-app-pub-3940256099942544/8691691433 (TEST ID, REPLACE AFTER)
// REWARDED VIDEO ANDROID ID: ca-app-pub-3940256099942544/5224354917 (TEST ID, REPLACE AFTER)

// AD OPEN TEST ID: ca-app-pub-3940256099942544/3419835294



// const testInterstitial = 'ca-app-pub-3940256099942544/8691691433';
// const productionInterstitial = 'ca-app-pub-3897756162473819/3608181403';

// const adUnit = Constants.isDevice && !__DEV__ ? productionInterstitial : testInterstitial;

// INTERSTITIAL AD
/* function showInterstitial() {
    AdMobInterstitial.setAdUnitID(adUnit)
    AdMobInterstitial.requestAdAsync().then(() => {
        AdMobInterstitial.showAdAsync()
            .catch((e) => { console.log(e) })
    });
} */
// REWARDED AD
/* function showRewarded() {
    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917')
    AdMobRewarded.requestAdAsync().then(() => {
        AdMobRewarded.showAdAsync()
        .catch((err) => console.log(err))
    })
} */


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

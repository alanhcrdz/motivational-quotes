/*  // ADS
import React from 'react';
import { View, Platform } from 'react-native';
import { AdMobInterstitial } from "expo-ads-admob";
import Constants from 'expo-constants';


    const productionIos =  ''
    const testIos =  ''

    const productionAndroid = ''
    const testAndroid = ''

const interstitialUnit = Platform.select({
    ios: Constants.isDevice && !__DEV__ ? productionIos : testIos,
    android: Constants.isDevice && !__DEV__ ? productionAndroid : testAndroid,
})

const InterstitialAd = () => {

    function showInterstitial() {
        AdMobInterstitial.setAdUnitID(interstitialUnit)
        AdMobInterstitial.requestAdAsync().then(() => {
            AdMobInterstitial.showAdAsync().catch((e) => {console.log(e)})
        });
    }
    return (
        null
    )
}

export default InterstitialAd;

  */

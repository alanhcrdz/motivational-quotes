/*  // ADS
import React from 'react';
import { View, Platform } from 'react-native';
import { AdMobInterstitial } from "expo-ads-admob";
import Constants from 'expo-constants';


    const productionIos =  'ca-app-pub-9871106933538473/5497945163'
    const testIos =  'ca-app-pub-3940256099942544/4411468910'

    const productionAndroid = 'ca-app-pub-9871106933538473/4460195663'
    const testAndroid = 'ca-app-pub-3940256099942544/1033173712'

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
/*  // ADS
import React from 'react';
import { View, Platform } from 'react-native';
import { AdMobInterstitial } from "expo-ads-admob";
import Constants from 'expo-constants';

import {
  REACT_APP_TEST_INT_ANDROID,
  REACT_APP_TEST_INT_IOS
} from "@env"

    const productionIos =  ''
<<<<<<< HEAD
    const testIos =  REACT_APP_TEST_INT_IOS

    const productionAndroid = ''
    const testAndroid = REACT_APP_TEST_INT_ANDROID
=======
    const testIos =  ''

    const productionAndroid = ''
    const testAndroid = ''
>>>>>>> 85792467079d2b6ae5598de05de3a8fe03917525

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

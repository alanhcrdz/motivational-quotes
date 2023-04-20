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

    const testIos =  REACT_APP_TEST_INT_IOS

    const productionAndroid = ''
    const testAndroid = REACT_APP_TEST_INT_ANDROID


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

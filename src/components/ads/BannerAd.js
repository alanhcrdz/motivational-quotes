// ADS
import React from 'react';
import { View, Platform } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import  Constants from 'expo-constants';

const productionAndroid = '';
const testAndroid = '';

const productionIos = '';
const testIos = '';

// UNITS
const bannerUnit = Platform.select({
    ios: Constants.isDevice && !__DEV__ ? productionIos : testIos,
    android: Constants.isDevice && !__DEV__ ? productionAndroid : testAndroid,
});




const BannerAd = () => {
    return (
        <AdMobBanner
                bannerSize='banner'
                adUnitID={bannerUnit}
                servePersonalizedAds={true}
                style={{
                    padding:10,
                }}
               
            />
    )
}

export default BannerAd;


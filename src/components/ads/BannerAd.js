// ADS
import React from 'react';
import { View, Platform } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import  Constants from 'expo-constants';

const productionAndroid = 'ca-app-pub-3897756162473819/1197161552';
const testAndroid = 'ca-app-pub-3940256099942544/6300978111';

const productionIos = 'ca-app-pub-3897756162473819/4529518433';
const testIos = 'ca-app-pub-3940256099942544/2934735716';

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


// ADS
import React from 'react';
import { Platform } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import  Constants from 'expo-constants';

const productionAndroid = 'ca-app-pub-9871106933538473/9702119337';
const testAndroid = 'ca-app-pub-3940256099942544/6300978111';

const productionIos = 'ca-app-pub-9871106933538473/1712960432';
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
                    alignSelf: 'center'
                }}
               
            />
    )
}

export default BannerAd;


// ADS
import React from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import  Constants from 'expo-constants';
// BANNER ANDROID ID: ca-app-pub-3940256099942544/6300978111 (TEST ID, REPLACE AFTER)
// INTERSTITIAL ANDROID ID: ca-app-pub-3940256099942544/1033173712 (TEST ID, REPLACE AFTER)
// INTERSTITIAL VIDEO ANDROID ID: ca-app-pub-3940256099942544/8691691433 (TEST ID, REPLACE AFTER)


const testBanner = 'ca-app-pub-3940256099942544/6300978111';
const productionBanner = 'ca-app-pub-3897756162473819/1197161552';

const bannerUnit = Constants.isDevice && !__DEV__ ? productionBanner :testBanner
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


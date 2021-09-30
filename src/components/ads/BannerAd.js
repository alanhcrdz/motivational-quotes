// ADS
import React from 'react';
import { View } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
// BANNER ANDROID ID: ca-app-pub-3940256099942544/6300978111 (TEST ID, REPLACE AFTER)
// INTERSTITIAL ANDROID ID: ca-app-pub-3940256099942544/1033173712 (TEST ID, REPLACE AFTER)
// INTERSTITIAL VIDEO ANDROID ID: ca-app-pub-3940256099942544/8691691433 (TEST ID, REPLACE AFTER)

const BannerAd = () => {
    return (
        <AdMobBanner
                bannerSize='banner'
                adUnitID="ca-app-pub-3940256099942544/6300978111"
                servePersonalizedAds={true}
                style={{
                    padding:10,
                }}
               
            />
    )
}

export default BannerAd;


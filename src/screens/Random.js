import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import ActionButton from '../components/ActionButton';
import RandomQuotes from '../components/RandomQuotes';
import colors from '../constants/colors';
import { AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";
import { WebView } from 'react-native-webview';
import fonts from '../constants/fonts';
// BANNER ANDROID ID: ca-app-pub-3940256099942544/6300978111 (TEST ID, REPLACE AFTER)
// INTERSTITIAL ANDROID ID: ca-app-pub-3940256099942544/1033173712 (TEST ID, REPLACE AFTER)
// INTERSTITIAL VIDEO ANDROID ID: ca-app-pub-3940256099942544/8691691433 (TEST ID, REPLACE AFTER)
// REWARDED VIDEO ANDROID ID: ca-app-pub-3940256099942544/5224354917 (TEST ID, REPLACE AFTER)

// AD OPEN TEST ID: ca-app-pub-3940256099942544/3419835294



// INTERSTITIAL AD
function showInterstitial() {
    AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/8691691433')
    AdMobInterstitial.requestAdAsync().then(() => {
        AdMobInterstitial.showAdAsync()
        .catch((e) => {console.log(e)})
    });
}
// REWARDED AD
function showRewarded() {
    AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917')
    AdMobRewarded.requestAdAsync().then(() => {
        AdMobRewarded.showAdAsync()
        .catch((err) => console.log(err))
    })
}


function Random({ navigation }) {
const [adLoaded, setAdLoaded] = useState(false);
useEffect(() => {

    // REWARDED
   AdMobRewarded.addEventListener('rewardedVideoUserDidEarnReward', () => {
       navigation.navigate('WebScreen')
   });

   AdMobRewarded.addEventListener('rewardedVideoDidLoad', () => {
       setAdLoaded(true)
   });

   AdMobRewarded.addEventListener('rewardedVideoDidDismiss', () => {
       setAdLoaded(false);
   });

   // INTERSTITIAL
   AdMobInterstitial.addEventListener('interstitialDidLoad', () => {
       setAdLoaded(true);
   });

   AdMobInterstitial.addEventListener('interstitialDidClose', () => {
       setAdLoaded(false);
       navigation.navigate('WebScreen');

   });
   


}, [])

    return (
        <View style={styles.container}>
            <RandomQuotes />
            <View style={styles.wrapper}>
                <Text style={styles.text}>Need more inspiration?</Text>
            </View>
            <ActionButton
            style={{ display: !adLoaded ?'none' : 'block' }}
            onPress={showInterstitial}
            title="Find out how to improve your life!"/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
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
    }
})

export default Random;

// ADS
import React from "react";
import { Platform } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import * as Device from "expo-device";

const productionAndroid = "";
const testAndroid = "";

const productionIos = "";
const testIos = "";

// UNITS
const bannerUnit = Platform.select({
  ios: Device.isDevice && !__DEV__ ? productionIos : testIos,
  android: Device.isDevice && !__DEV__ ? productionAndroid : testAndroid,
});

const BannerAd = () => {
  return (
    <AdMobBanner
      bannerSize="banner"
      adUnitID={bannerUnit}
      servePersonalizedAds={true}
      style={{
        alignSelf: "center",
      }}
    />
  );
};

export default BannerAd;

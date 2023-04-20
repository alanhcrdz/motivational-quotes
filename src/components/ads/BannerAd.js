// ADS
import React from "react";
import { Platform } from "react-native";
import { AdMobBanner } from "expo-ads-admob";
import * as Device from "expo-device";

import {
  REACT_APP_TEST_BANNER_ANDROID,
  REACT_APP_TEST_BANNER_IOS
} from "@env"

const productionAndroid = "";
const testAndroid = REACT_APP_TEST_BANNER_ANDROID;

const productionIos = "";
const testIos = REACT_APP_TEST_BANNER_IOS;


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

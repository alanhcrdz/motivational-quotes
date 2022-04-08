import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  FlatList,
  BackHandler,
  Alert,
  Animated,
} from "react-native";
import * as Device from "expo-device";

import colors from "../constants/colors";
import fonts from "../constants/fonts";
//import { enCA, es, ptBR } from 'date-fns/locale';
//import DailyCard from '../components/DailyCard';
import { CategoriesData } from "../components/CategoriesData";
import { useIsFocused } from "@react-navigation/native";
import BannerAd from "../components/ads/BannerAd";
import { useDataContext } from "../hooks/useDataContext";
import { AdMobInterstitial } from "expo-ads-admob";
import { ActivityIndicator } from "react-native-paper";

//import Toolbar from '../components/Toolbar';

export default function HomeScreen({ navigation }) {
  // firestore database
  const { adLoading, setAdLoading } = useDataContext();

  const isFocused = useIsFocused();
  useEffect(() => {
    StatusBar.setHidden(true);
    if (isFocused) {
      const backAction = () => {
        Alert.alert("Leaving Already?", "Are you sure you want to exit app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          { text: "Exit App", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    } else {
      BackHandler.removeEventListener("hardwareBackPress");
    }
  }, []);

  const DATA = CategoriesData;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const animFade = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }) => {
    // interstitial
    const productionInterIos = "ca-app-pub-9871106933538473/5497945163";
    const testInterIos = "ca-app-pub-3940256099942544/4411468910";

    const productionInterAndroid = "ca-app-pub-9871106933538473/2193673059";
    const testInterAndroid = "ca-app-pub-3940256099942544/1033173712";

    const interstitialUnit = Platform.select({
      ios: Device.isDevice && !__DEV__ ? productionInterIos : testInterIos,
      android:
        Device.isDevice && !__DEV__ ? productionInterAndroid : testInterAndroid,
    });
    function showInterstitial() {
      setAdLoading(true);
      AdMobInterstitial.setAdUnitID(interstitialUnit);
      AdMobInterstitial.requestAdAsync().then(() => {
        AdMobInterstitial.showAdAsync().catch((e) => {
          console.log(e);
        });
        setAdLoading(false);
      });
    }

    return (
      <>
        <TouchableOpacity
          onPress={() => {
            showInterstitial();
            animFade();
            setTimeout(() => {
              navigation.navigate(item.navigate, {
                category: item.category,
                name: item.title,
                slug: item.slug,
                subtitle: item.subtitle,
                background: item.background,
              });
            }, 1000);
            // loadRandomQuotes();
          }}
          activeOpacity={0.6}
          key={item.id}
          style={[styles.list, styles.overlay]}
        >
          <ImageBackground
            style={styles.background}
            source={item.background}
            imageStyle={{ opacity: 0.6 }}
          >
            <Text style={styles.title}>{item.title}</Text>
          </ImageBackground>
        </TouchableOpacity>
      </>
    );
  };
  const renderHeader = () => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.bgWrapper, styles.overlay]}
          onPress={() => {
            navigation.navigate("EventsWebScreen");
          }}
        >
          <ImageBackground
            style={{ height: "100%", flexDirection: "column-reverse" }}
            source={require("../assets/artsphoto.png")}
            imageStyle={{ opacity: 0.6 }}
          >
            <View style={styles.headerContentWrapper}>
              <Text style={[styles.title, { textAlign: "left" }]}>
                Arts for Change Events
              </Text>
              <Text style={[styles.text, { textAlign: "left" }]}>
                Check our upcoming events and supporters!
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <Text style={[styles.title, { textAlign: "left", marginTop: 20 }]}>
          Explore
        </Text>
      </>
    );
  };

  return (
    <View style={styles.content}>
      <View style={styles.catContainer}>
        {adLoading ? (
          <Animated.View style={[styles.loadingBox, { opacity: fadeAnim }]}>
            <ActivityIndicator size={22} color={colors.white} />
            <Text style={styles.text}>Loading quotes, please wait...</Text>

            {/* <Text style={styles.text}>{randomQuotes.content}</Text> */}
          </Animated.View>
        ) : (
          <FlatList
            ListHeaderComponent={renderHeader}
            keyExtractor={(item, index) => item.id}
            data={DATA}
            numColumns={1}
            renderItem={renderItem}
            // for better performance (if needed, install recyclerlistview)
            initialNumToRender={5}
            maxToRenderPerBatch={10}
            windowSize={10}
            removeClippedSubviews={true}
            updateCellsBatchingPeriod={100}
          />
        )}
        <View style={styles.adContainer}>
          <BannerAd />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.background,
    padding: 10,
    height: "100%",
  },
  catContainer: {
    marginBottom: 50,
  },
  loadingBox: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  adContainer: {
    flex: 5,
  },
  background: {
    width: "100%",
    height: "100%",
  },
  bgWrapper: {
    width: "100%",
    height: 200,
    backgroundColor: "red",
    borderRadius: 12,
    overflow: "hidden",
  },
  headerContentWrapper: {
    padding: 8,
    backgroundColor: colors.opacityBlack,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  title: {
    fontSize: 22,
    fontFamily: fonts.title,
    color: colors.white,
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.text,
    color: colors.white,
    marginTop: 15,
    textAlign: "center",
  },
  categoryTitle: {
    marginTop: 20,
    fontSize: 20,
    fontFamily: fonts.title,
    color: colors.white,
  },
  list: {
    flex: 1,
    borderRadius: 8,
    marginTop: 20,
    overflow: "hidden",
  },

  background: {
    padding: 20,
    height: 120,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  overlay: {
    // height: 160,
    backgroundColor: colors.opacityBlack,
  },
  subtitleWrapper: {
    padding: 8,
    backgroundColor: colors.accent,
    borderRadius: 20,
    marginTop: 20,
  },
  subtitle: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fonts.text,
  },
});

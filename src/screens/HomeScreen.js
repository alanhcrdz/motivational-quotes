import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  StatusBar,
  FlatList,
  BackHandler,
  Alert,
  Animated,
  Modal,
  TouchableHighlight,

} from "react-native";
import NetInfo from '@react-native-community/netinfo'
import {  Entypo } from "@expo/vector-icons";
import * as Device from "expo-device";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
//import { enCA, es, ptBR } from 'date-fns/locale';
//import DailyCard from '../components/DailyCard';
import { CategoriesData } from "../components/CategoriesData";
import { useIsFocused } from "@react-navigation/native";
import { useDataContext } from "../hooks/useDataContext";
import { AdMobRewarded } from "expo-ads-admob";
import { ActivityIndicator } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import OfflineNotice from "../components/OfflineNotice";

export default function HomeScreen({ navigation }) {
  // const [modalVisible, setModalVisible] = useState(false);
  const [netInfo, setNetInfo] = useState('');
  const [isConnected, setIsConnected] = useState()
  // firestore database
  // const { adLoading, setAdLoading, loading, setLoading } = useDataContext();
  
  const isFocused = useIsFocused();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(
        `Connection type: ${state.type}
        Is connected? ${state.isConnected}
        Ip Address: ${state.details.ipAddress}`
      )
      setIsConnected(state.isConnected)
    })
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
      return () => {
        backHandler.remove();
        unsubscribe();
      }
    } else {
      BackHandler.removeEventListener("hardwareBackPress");

    }
  }, []);

  
  // rewarded
  // const prodRewardedIos = "ca-app-pub-9871106933538473/1612406555";
  // const testRewardedIos = "ca-app-pub-3940256099942544/1712485313";

  // const prodRewardedAndr = "ca-app-pub-9871106933538473/2015201008";
  // const testRewardedAndr = "ca-app-pub-3940256099942544/5224354917";

  /* const RewardedUnit = Platform.select({
    ios: Device.isDevice && !__DEV__ ? prodRewardedIos : testRewardedIos,
    android: Device.isDevice && !__DEV__ ? prodRewardedAndr : testRewardedAndr,
  }); */

  /* async function showRewarded() {
    setAdLoading(true);

    // await setTestDeviceIDAsync("EMULATOR");

    await AdMobRewarded.setAdUnitID(RewardedUnit);
    await AdMobRewarded.requestAdAsync().then(() => {
      AdMobRewarded.showAdAsync().catch((err) => console.log(err));
    });
    AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
      setAdLoading(false);
      setModalVisible(false);
      console.log("Reward granted.");
      navigation.navigate("EventsWebScreen");
      removeRewardedListeners();
    });
    AdMobRewarded.addEventListener("rewardedVideoDidPresent", () => {
      setAdLoading(false);
      console.log("Add is presented");
    });

    AdMobRewarded.addEventListener("rewardedVideoDidFailToPresent", () => {
      setAdLoading(false);
      console.log("Add failed to present");
    });

    AdMobRewarded.addEventListener("rewardedVideoDidLoad", () => {
      setAdLoading(false);
      console.log("Add loaded!");
    });
    AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () => {
      setAdLoading(false);
      navigation.navigate("EventsWebScreen");
      console.log("Add not loaded");
      removeRewardedListeners();
    });

    AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
      setModalVisible(false);
      setAdLoading(false);
      console.log("Video Dismissed.");
      removeRewardedListeners();
    });
  } */
  /* function removeRewardedListeners() {
    AdMobRewarded.removeAllListeners();
    console.log("Removed all listeners");
  } */

  /* const fadeAnim = useRef(new Animated.Value(0)).current;
  const animFade = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }; */

  const DATA = CategoriesData;
  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(item.navigate, {
              category: item.category,
              name: item.title,
              slug: item.slug,
            });
          }}
          activeOpacity={0.6}
          key={item.id}
          disabled={!isConnected ? 'true' : 'false'}
          style={[styles.list, {backgroundColor: !isConnected ? '#d3d3d3' : colors.opacityBlack}]}
        >
          <ImageBackground
            style={styles.background}
            source={item.background}
            imageStyle={{ opacity: 0.6 }}
          >
            {!isConnected ? <Entypo name="block" size={24} color='red' /> : null}
            <Text style={[styles.title_dark, { color: "#fff" }]}>
              {item.title}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </>
    );
  };
  /* const renderHeader = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[styles.bgWrapper, styles.overlay]}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <ImageBackground
            style={{ height: "100%", flexDirection: "column-reverse" }}
            source={require("../assets/artsphoto.png")}
            imageStyle={{ opacity: 0.6 }}
          >
            <View style={styles.headerContentWrapper}>
              <Text
                style={[
                  styles.title_dark,
                  { textAlign: "left", color: "#fff" },
                ]}
              >
                Arts for Change
              </Text>
              <Text style={[styles.text, { textAlign: "left" }]}>
                Creating a Better Tomorrow Together!
              </Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <Modal animationType="slide" visible={modalVisible} transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => {
                    setModalVisible(false);
                  }}
                >
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color={colors.icecream}
                  />
                </TouchableOpacity>

                <Image
                  source={require("../assets/gallery.png")}
                  style={styles.storeImage}
                />
              </View>
              <View
                style={{
                  width: "100%",
                  height: 300,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.modalText}>
                  Watch a video to unlock exclusive content and feature.
                </Text>

                <TouchableHighlight
                  style={{ ...styles.openButton }}
                  onPress={() => {
                    showRewarded();
                  }}
                >
                  <View>
                    <Text style={styles.textStyle}>Check Now!</Text>
                  </View>
                </TouchableHighlight>
                {adLoading ? (
                  <View style={{ marginTop: 10 }}>
                    <ActivityIndicator size={20} color={colors.primary} />
                    <Text style={styles.callback}>Please wait...</Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </Modal>
        <Text
          style={[
            styles.title_light,
            { textAlign: "left", marginTop: 20, color: "white" },
          ]}
        >
          Explore
        </Text>
      </>
    );
  };
 */
  return (
    <View style={styles.container_light}>
      {!isConnected ?  <OfflineNotice /> : null}
      <View style={styles.catContainer}>
        <FlatList
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container_light: {
    backgroundColor: colors.background,
    height: "100%",
    padding: 10,
  },
  container_dark: {
    backgroundColor: colors.background,
    height: "100%",
  },
  catContainer: {},
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

  title_light: {
    fontSize: 22,
    fontFamily: fonts.title,
    color: colors.lightgray,
  },
  title_dark: {
    fontSize: 22,
    fontFamily: fonts.title,
    color: "#000",
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
  // MODAL STYLE
  centeredView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    alignItems: "center",
    width: "100%",
    height: 200,
    backgroundColor: colors.primary,
  },

  openButton: {
    marginTop: 20,
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    width: 270,
    backgroundColor: colors.primary,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  modalTitle: {
    marginTop: 50,
    fontFamily: fonts.title,
    fontSize: 20,
    textAlign: "center",
  },
  modalText: {
    color: colors.lightgray,
    marginTop: 50,
    lineHeight: 20,
    width: "90%",
    fontFamily: fonts.text,
    fontSize: 18,
    textAlign: "center",
  },
  close: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  storeImage: {
    width: 250,
    height: 250,
    position: "absolute",
    top: 5,
  },
  linkClose: {
    marginTop: 30,
    fontSize: 16,
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.blue,
  },
  callback: {
    marginTop: 6,
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.lightgray,
  },
  modalView: {
    borderRadius: 12,
    alignItems: "center",
    width: "90%",
    height: 500,
    backgroundColor: colors.icecream,
    overflow: "hidden",
  },
});

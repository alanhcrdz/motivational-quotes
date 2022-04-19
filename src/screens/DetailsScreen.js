import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  memo,
  useRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  Modal,
  TouchableHighlight,
  Platform,
  LogBox,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
//import actions
import { addFavorite, removeFavorite, getQuotes } from "../redux/actions";

// import ActionButton from '../components/ActionButton';
import colors from "../constants/colors";
import { useDataContext } from "../hooks/useDataContext";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import fonts from "../constants/fonts";
import {
  AdMobRewarded,
  setTestDeviceIDAsync,
  isAvailableAsync,
} from "expo-ads-admob";
import * as Device from "expo-device";

// getting quotes from firebase
import { collection, getDocs, getFirestore } from "firebase/firestore";
LogBox.ignoreLogs(["Setting a timer"]);

const ActionsContainer = styled.View`
  justify-content: space-between;
  align-items: center;
`;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function DetailsScreen({ route, navigation }) {
  // lets cleanUp firestore data fetch on useEffect
  const isMounted = useRef(false);

  const [refreshing, setRefreshing] = useState(false);
  const [adLoading, setAdLoading] = useState(false);
  const [adLoaded, setAdLoaded] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [quotes, setQuotes] = useState([]);

  const { category, name, subtitle, background, slug } = route.params;
  const { loading, setLoading } = useDataContext();
  const db = getFirestore();

  async function getQuotes() {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "quotes"));
      const listQuotes = [];
      querySnapshot.forEach((doc) => {
        listQuotes.push({
          ...doc.data(),
          key: doc.id,
        });
      });

      if (isMounted.current) {
        setQuotes(listQuotes);
        setLoading(false);
      }
    } catch (error) {
      isMounted.current && console.log("Could not find data: ", error);
    }
  }

  useEffect(() => {
    isMounted.current = true;
    getQuotes();
    // this is run when component unmount (cleanUp)
    return () => (isMounted.current = false);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  // rewarded
  const prodRewardedIos = "ca-app-pub-9871106933538473/1612406555";
  const testRewardedIos = "ca-app-pub-3940256099942544/1712485313";

  const prodRewardedAndr = "ca-app-pub-9871106933538473/2015201008";
  const testRewardedAndr = "ca-app-pub-3940256099942544/5224354917";

  const RewardedUnit = Platform.select({
    ios: Device.isDevice && !__DEV__ ? prodRewardedIos : testRewardedIos,
    android: Device.isDevice && !__DEV__ ? prodRewardedAndr : testRewardedAndr,
  });

  async function showRewarded() {
    // await setTestDeviceIDAsync("EMULATOR");

    setAdLoading(true);
    await AdMobRewarded.setAdUnitID(RewardedUnit);
    await AdMobRewarded.requestAdAsync().then(() => {
      AdMobRewarded.showAdAsync().catch((err) => console.log(err));
    });
    AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
      setModalVisible(false);
      navigation.navigate("WebScreen", {
        slug,
      });
      removeRewardedListeners();
      console.log("Reward granted.");
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
      navigation.navigate("WebScreen", {
        slug,
      });
      console.log("Add loaded!");
    });
    AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () => {
      setAdLoading(false);
      console.log("Add not loaded");
    });

    AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
      setModalVisible(false);
      setAdLoading(false);
      removeRewardedListeners();
      console.log("Video Dismissed.");
    });
  }
  function removeRewardedListeners() {
    AdMobRewarded.removeAllListeners();
  }

  // handling favorites with redux
  /*   const { favorites, quotes } = useSelector((state) => state.quotesReducer);
  const dispatch = useDispatch();

  const addToFavorites = (quote) => dispatch(addFavorite(quote));
  const removeFromFavorites = (quote) => dispatch(removeFavorite(quote));

  const handleAddFavorites = (quote) => {
    addToFavorites(quote);
  };
  const handleRemoveFavorites = (quote) => {
    removeFromFavorites(quote);
  };

  const ifExists = (quote) => {
    if (favorites.filter((item) => item.id === quote.id).lenght > 0) {
      return true;
    }
    return false;
  }; */

  const filteredQuotes = quotes.filter((quote) => quote.category === category);

  const renderItem = ({ item }) => {
    const { picture } = item;
    return (
      <>
        <View
          style={{
            width: "100%",
            height: "100%",
            flex: 1,
          }}
        >
          <TouchableOpacity
            style={styles.imgContainer}
            onPress={() =>
              navigation.navigate("ShowImage", {
                picture,
                category,
                name,
                membership: item.creator.membership,
                user_store: item.creator.user_store,
                username: item.creator.username,
              })
            }
          >
            <ImageBackground style={styles.picture} source={{ uri: picture }} />
          </TouchableOpacity>
          {/*  <View style={{ margin: 10 }}>
            <TouchableOpacity
              onPress={() => {
                ifExists(item)
                  ? handleRemoveFavorites(item)
                  : handleAddFavorites(item);
              }}
            >
              <AntDesign
                name={ifExists(item) ? "heart" : "hearto"}
                size={24}
                color={ifExists(item) ? colors.accent : colors.white}
              />
            </TouchableOpacity>
          </View> */}
        </View>
      </>
    );
  };
  const renderHeader = () => {
    return (
      <View style={[styles.headerContent, styles.overlay]}>
        <ImageBackground
          style={styles.headerBackground}
          source={background}
          imageStyle={{ opacity: 0.4 }}
        >
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </ImageBackground>
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <View style={styles.boxContainer}>
        <Text style={styles.labelText}>Explore {name} Gallery and more!</Text>
        <TouchableOpacity
          style={[styles.button, styles.overlay]}
          activeOpacity={0.4}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <ImageBackground
            style={styles.background}
            source={require("../assets/creative.png")}
            imageStyle={{ opacity: 0.6 }}
          >
            <View style={styles.imageContainer}>
              <Text style={styles.title}>
                View more pictures, rate your favorite on our gallery page!
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
                  View more features on the community page.
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
      </View>
    );
  };
  const LoadingBar = () => {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.white} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingBar />
      ) : (
        <FlatList
          style={{ flex: 1 }}
          keyExtractor={(item) => item.key}
          data={filteredQuotes}
          numColumns={2}
          renderItem={renderItem}
          // for better performance (see more at: https://reactnative.dev/docs/optimizing-flatlist-configuration)
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={21}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={100}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          // reresh control
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    justifyContent: "space-between",
    flexGrow: 1,
    width: "100%",
  },
  heading: {
    width: "90%",
  },
  loadingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    padding: 6,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 40,
    backgroundColor: colors.opacityWhite,
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    width: "100%",
    flexGrow: 1,
    padding: 6,
    backgroundColor: colors.background,
  },
  picture: {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    height: 280,
    backgroundColor: colors.opacityWhite,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 8,
    justifyContent: "center",
  },

  quotesCard: {
    marginTop: 20,
    borderRadius: 8,
    padding: 16,
    backgroundColor: colors.opacityWhite,
    height: 250,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  action: {
    marginTop: 30,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.title,
    fontSize: 18,
    lineHeight: 25,
    textAlign: "center",
  },
  subtitle: {
    width: "90%",
    color: colors.white,
    fontFamily: fonts.text,
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    alignSelf: "center",
    fontWeight: "500",
    fontStyle: "italic",
  },
  labelText: {
    color: colors.white,
    fontFamily: fonts.title,
    fontSize: 18,
    textTransform: "uppercase",
    marginBottom: 20,
    marginTop: 20,
    alignSelf: "center",
    textAlign: "center",
  },
  button: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  boxContainer: {
    width: "95%",
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 8,
    padding: 8,
    backgroundColor: colors.opacityWhite,
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "center",
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

  // image
  imageContainer: {
    padding: 6,
  },
  headerContent: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerBackground: {
    width: "100%",
    height: 180,
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  overlay: {
    // height: 160,
    backgroundColor: colors.opacityBlack,
    marginBottom: 50,
  },
});

export default memo(DetailsScreen);

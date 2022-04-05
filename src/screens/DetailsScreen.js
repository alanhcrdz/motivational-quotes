import React, { useEffect, useMemo, useState, useCallback, memo } from "react";
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
} from "react-native";
import { Button, overlay } from "react-native-paper";
import { connect } from "react-redux";
// import ActionButton from '../components/ActionButton';
import { QuotesList } from "../components/QuotesList";
import colors from "../constants/colors";
import { useDataContext } from "../hooks/useDataContext";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";
import fonts from "../constants/fonts";
import { AdMobRewarded } from "expo-ads-admob";
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

function DetailsScreen({ route, navigation, quote = {} }) {
  const [refreshing, setRefreshing] = useState(false);
  const [adLoading, setAdLoading] = useState(false);
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
        // doc.data() is never undefined for query doc snapshots
        listQuotes.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setQuotes(listQuotes);
    } catch (error) {
      console.log("Could not find data: ", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getQuotes();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  const filteredQuotes = quotes.filter((quote) => quote.category === category);
  const handleModalVisibility = () => {
    setModalVisible(true);
  };

  // rewarded
  const prodRewardedIos = "ca-app-pub-9871106933538473/1612406555";
  const testRewardedIos = "ca-app-pub-3940256099942544/1712485313";

  const prodRewardedAndr = "ca-app-pub-9871106933538473/2015201008";
  const testRewardedAndr = "ca-app-pub-3940256099942544/5224354917";

  const RewardedUnit = Platform.select({
    ios: Device.isDevice && !__DEV__ ? prodRewardedIos : testRewardedIos,
    android: Device.isDevice && !__DEV__ ? prodRewardedAndr : testRewardedAndr,
  });

  function showRewarded() {
    setAdLoading(true);
    AdMobRewarded.setAdUnitID(RewardedUnit);
    AdMobRewarded.requestAdAsync().then(() => {
      AdMobRewarded.showAdAsync().catch((err) => console.log(err));
    });
    AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
      setModalVisible(false);
      navigation.navigate("WebScreen", {
        slug,
      });
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
      console.log("Add loaded!");
    });
    AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () => {
      setAdLoading(false);
      console.log("Add not loaded");
    });

    AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
      setModalVisible(false);
      setAdLoading(false);
      console.log("Video Dismissed.");
    });
  }

  const renderItem = ({ item }) => {
    const { picture } = item;

    return (
      <>
        <TouchableOpacity
          style={styles.imgContainer}
          onPress={() =>
            navigation.navigate("ShowImage", {
              picture,
              category,
              name,
            })
          }
        >
          <ImageBackground style={styles.picture} source={{ uri: picture }} />

          {/* <ActionsContainer>
            <Favorite picture={quote} />
          </ActionsContainer> */}
        </TouchableOpacity>
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
          <Text style={styles.title}>{name} Quotes</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </ImageBackground>
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <>
        <View style={styles.boxContainer}>
          <Text style={styles.labelText}>Explore {name} Gallery</Text>
          <TouchableOpacity
            style={[styles.button, styles.overlay]}
            activeOpacity={0.4}
            onPress={handleModalVisibility}
          >
            <ImageBackground
              style={styles.background}
              source={require("../assets/creative.png")}
              imageStyle={{ opacity: 0.6 }}
            >
              <View style={styles.imageContainer}>
                <Text style={styles.title}>
                  View more paintings and pictures taken from Creators around
                  the world!
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <Modal animationType="slide" visible={modalVisible} transparent>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <AntDesign name="closecircleo" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.modalText}>
                  Watch an Ad to unlock more beautiful paintings and pictures!
                </Text>

                <TouchableHighlight
                  style={{ ...styles.openButton }}
                  onPress={showRewarded}
                >
                  <View>
                    {adLoading ? (
                      <ActivityIndicator size={20} color={colors.white} />
                    ) : (
                      <Text style={styles.textStyle}>
                        Check Creators Gallery
                      </Text>
                    )}
                  </View>
                </TouchableHighlight>
                <Text style={styles.callback}>
                  {adLoading ? "Please wait..." : ""}
                </Text>
                <Text style={styles.callback}>
                  {adLoading
                    ? "😊 You'll be redirected to our creators gallery!"
                    : ""}
                </Text>
              </View>
            </View>
          </Modal>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color={colors.white} />
        </View>
      ) : filteredQuotes.length < 1 ? (
        <View style={styles.emptyList}>
          <Text style={styles.title}>Empty list for "{name}".</Text>
        </View>
      ) : (
        <FlatList
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

/* const mapDispatchToProps = (dispatch) => ({
  addQuote: (quote) => dispatch(addQuote(quote)),
});
 */
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: "100%",
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
    width: "50%",
    padding: 6,
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
    color: colors.white,
    fontFamily: fonts.text,
    fontSize: 16,
    textAlign: "center",
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  openButton: {
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    width: 250,
    backgroundColor: colors.accent,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    textTransform: "uppercase",
    color: colors.white,
  },
  close: {
    marginBottom: 10,
  },
  callback: {
    marginTop: 6,
    textAlign: "center",
    fontFamily: fonts.text,
    color: colors.white,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // image
  imageContainer: {
    padding: 6,
  },
  headerContent: {
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

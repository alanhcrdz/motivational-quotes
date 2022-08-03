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
  Platform,
  LogBox,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
//import actions
import { getQuotes, addFavorite, removeFavorite } from "../redux/actions";

// import ActionButton from '../components/ActionButton';
import colors from "../constants/colors";
import { useDataContext } from "../hooks/useDataContext";
import styled from "styled-components/native";
import fonts from "../constants/fonts";
import { AdMobInterstitial } from "expo-ads-admob";
import * as Device from "expo-device";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

// getting quotes from firebase
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
  // const [adLoaded, setAdLoaded] = useState(null);
  const [showFooter, setShowFooter] = useState(false);

  const { category, name, slug } = route.params;
  const { loading, setLoading } = useDataContext();
  const { quotes, favorites } = useSelector((state) => state.quotesReducer);

  const dispatch = useDispatch();
  const fetchQuotes = () => {
    dispatch(getQuotes());
  };

  useEffect(() => {
    isMounted.current = true;
    fetchQuotes();

    // this is run when component unmount (cleanUp)
    return () => (isMounted.current = false);
  }, []);

  // renderComponent after 3 seconds

  useEffect(() => {
    isMounted.current = true;
    setTimeout(() => {
      setShowFooter(!showFooter);
    }, 4000);
    return () => (isMounted.current = false);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  //ads
  const productionInterIos = "";
  const testInterIos = "";

  const productionInterAndroid = "";
  const testInterAndroid = "";

  const interstitialUnit = Platform.select({
    ios: Device.isDevice && !__DEV__ ? productionInterIos : testInterIos,
    android:
      Device.isDevice && !__DEV__ ? productionInterAndroid : testInterAndroid,
  });
  async function showInterstitial() {
    setAdLoading(true);
    await AdMobInterstitial.setAdUnitID(interstitialUnit);
    await AdMobInterstitial.requestAdAsync().then(() => {
      AdMobInterstitial.showAdAsync().catch((e) => {
        console.log(e);
      });

      setAdLoading(false);
    });
  }

  // handling favorites
  const addToFavoriteList = (quote) => dispatch(addFavorite(quote));

  const removeFromFavoriteList = (quote) => dispatch(removeFavorite(quote));

  const handleAddFavorites = (quote) => {
    addToFavoriteList(quote);
  };

  const handleRemoveFavorites = (quote) => {
    removeFromFavoriteList(quote);
  };

  const ifExists = (quote) => {
    if (favorites.filter((item) => item.key === quote.key).length > 0) {
      return true;
    }
    return false;
  };

  const filteredQuotes = quotes.filter((quote) => quote.category === category);

  const renderItem = ({ item }) => {
    const { picture } = item;
    return (
      <View
        style={{
          width: "50%",
          height: "100%",
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
        <View
          style={{
            margin: 10,
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
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
              color={ifExists(item) ? colors.white : "#64676D"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      showFooter && (
        <View style={styles.boxContainer}>
          <Text style={styles.labelText}>Explore {name} Gallery and more!</Text>
          <TouchableOpacity
            style={[styles.button, styles.overlay]}
            activeOpacity={0.4}
            onPress={() => {
              if (
                category === "motivationalprosperity" ||
                category === "motivationalsuccess" ||
                category === "motivationalconfidence" ||
                category === "motivationallove"
              ) {
                showInterstitial();
                setTimeout(() => {
                  navigation.navigate("WebScreen", {
                    slug,
                  });
                }, 3000);
              } else {
                navigation.navigate("WebScreen", {
                  slug,
                });
              }
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
        </View>
      )
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
      {filteredQuotes.length < 0 ? (
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
          ListFooterComponent={renderFooter}
          contentContainerStyle={{ flexGrow: 1 }}
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
  loadingWrapper: {
    flexGrow: 1,
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

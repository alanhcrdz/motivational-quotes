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
//import actions

// import ActionButton from '../components/ActionButton';
import colors from "../constants/colors";
import { useDataContext } from "../hooks/useDataContext";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import fonts from "../constants/fonts";

import { useSelector, useDispatch } from "react-redux";
import { removeFavorite } from "../redux/actions";

function Favorites({ route, navigation }) {
  const [refreshing, setRefreshing] = useState(false);

  const { loading, setLoading } = useDataContext();

  // listing favorites with redux
  const { favorites } = useSelector((state) => state.quotesReducer);
  const dispatch = useDispatch();

  const removeFromFavorites = (quote) => dispatch(removeFavorite(quote));

  const handleRemoveFavorites = (quote) => {
    removeFromFavorites(quote);
  };

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
          <TouchableOpacity onPress={() => handleRemoveFavorites(item)}>
            <FontAwesome name={"remove"} size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
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
      ) : favorites.length === 0 ? (
        <View
          style={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#64676D", fontSize: 18 }}>
            No favorites found. Add a picture to the list.
          </Text>
        </View>
      ) : (
        <FlatList
          style={{ flexGrow: 1 }}
          keyExtractor={(item) => item.key}
          data={favorites}
          numColumns={2}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          // for better performance (see more at: https://reactnative.dev/docs/optimizing-flatlist-configuration)
          initialNumToRender={5}
          maxToRenderPerBatch={10}
          windowSize={21}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={100}
          // reresh control
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

export default memo(Favorites);

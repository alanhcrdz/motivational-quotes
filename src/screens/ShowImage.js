import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Modal,
  TouchableHighlight,
  ActivityIndicator,
  Platform,
} from "react-native";
import AnimatedLottieView from "lottie-react-native";

//share and download images feature
 import * as Sharing from "expo-sharing";
 import * as FileSystem from "expo-file-system";

import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import colors from "../constants/colors";
import { Notifier, Easing } from "react-native-notifier";
import fonts from "../constants/fonts";

//redux
// import { createStructuredSelector } from "reselect";
// import { selectQuoteMarked } from "../redux/quotes/quotes.selectors";
// import { toggleFavorite, addQuote } from "../redux/quotes/quotes.actions";
// import { QuotesActionTypes } from "../redux/quotes/quotes.types";
// import { Favorite } from "../components/favorites/favorites.component";

const ShowImage = ({ route, navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [iconShow, setIconShow] = useState("none");
  const { picture, category, membership, user_store, username } = route.params;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  const toggleFade = () => {
    if (iconShow === "none") {
      setIconShow("flex");
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      setIconShow("none");
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  // download

  /*   const downloadFile = async () => {
    const uri = picture;
    let fileUri = FileSystem.documentDirectory + `${category}_quotes.png`;
    await FileSystem.downloadAsync(uri, fileUri)
      .then(({ uri }) => {
        saveFile(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 */
  /* const saveFile = async (fileUri) => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      try {
        MediaLibrary.requestPermissionsAsync();
        const asset = await MediaLibrary.createAssetAsync(fileUri);
        await MediaLibrary.createAlbumAsync(
          "Motivational Quotes",
          asset,
          false
        );
        Notifier.showNotification({
          title: "Image Downloaded",
          description: "File has been saved on your phone.",
          duration: 3000,
          showAnimationDuration: 800,
          showEasing: Easing.ease,
          hideOnPress: false,
          queueMode: "immediate",
        });
      } catch (err) {
        console.log("Save error: ", err);
      }
    }
  }; */
  // sharing
   const source = picture;
    const onShare = () => {
    FileSystem.downloadAsync(source, FileSystem.documentDirectory + ".png")
      .then(({ uri }) => {
        console.log("finished download to " + uri);

        Sharing.shareAsync(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  }; 

  useEffect(() => {
    if (membership === "premium") {
      Notifier.showNotification({
        title: "This Picture is for sale as a product!",
        description: "Click on the shop icon below to enter the online store.",
        duration: 5000,
        showAnimationDuration: 800,
        showEasing: Easing.ease,
        hideOnPress: false,
        queueMode: "immediate",
      });
    }
  }, []);

  // Capitalize

  return (
    <TouchableWithoutFeedback onPress={toggleFade}>
      <ImageBackground style={styles.image} source={{ uri: picture }}>
        <Animated.View style={[styles.iconsContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity
            activeOpacity={0.4}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={[styles.icon, { display: iconShow }]}>
              <AntDesign
                style={{ margin: 20 }}
                name="arrowleft"
                size={24}
                color={colors.white}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
            <View style={styles.label}>
              <Text style={[styles.iconText, { display: iconShow }]}>Back</Text>
            </View>
          </TouchableOpacity>

          {/*  <TouchableOpacity onPress={downloadFile}>
            <View style={[styles.icon, { display: iconShow }]}>
              <Feather
                style={{ margin: 20 }}
                name="download"
                size={24}
                color={colors.white}
              />
            </View>
            <View style={styles.label}>
              <Text style={[styles.iconText, { display: iconShow }]}>
                Download
              </Text>
            </View>
          </TouchableOpacity> */}

           <TouchableOpacity onPress={onShare}>
            <View style={[styles.icon, { display: iconShow }]}>
              <Entypo
                style={{ margin: 20 }}
                name="share"
                size={24}
                color={colors.white}
              />
            </View>
            <View style={styles.label}>
              <Text style={[styles.iconText, { display: iconShow }]}>
                Share
              </Text>
            </View>
          </TouchableOpacity> 

          {membership === "premium" ? (
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <View style={[styles.icon, { display: iconShow }]}>
                <Entypo
                  style={{ margin: 20 }}
                  name="shop"
                  size={24}
                  color={colors.white}
                />
              </View>
              <View style={styles.label}>
                <Text style={[styles.iconText, { display: iconShow }]}>
                  Shop
                </Text>
              </View>
            </TouchableOpacity>
          ) : null}

          {/* FAVORITES FEATURE WILL BE ADDED LATER, AFTER STUDY MORE!!! */}
         
        </Animated.View>

        {/* MODAL FOR LOADING AD */}
        <Modal animationType="slide" visible={modalVisible} transparent>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  style={styles.close}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <AntDesign
                    name="closecircleo"
                    size={24}
                    color={colors.icecream}
                  />
                </TouchableOpacity>
                <AnimatedLottieView
                  key="animation"
                  autoPlay
                  loop
                  resizeMode="cover"
                  source={require("../assets/shop.json")}
                  style={styles.storeImage}
                />
              </View>
              <Text style={styles.modalTitle}>Support our Creators!</Text>
              <Text style={styles.modalText}>
                The owner of this amazing picture sells its products online.
                Show gratitude by visiting!
              </Text>

              <TouchableHighlight
                style={{ ...styles.openButton }}
                onPress={() => {
                  navigation.navigate("CreatorStore", {
                    user_store,
                  });
                  setModalVisible(false);
                }}
              >
                <View>
                  <Text style={styles.textStyle}>Go to Online Store</Text>
                </View>
              </TouchableHighlight>
              <Text
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={[styles.modalText, { color: colors.blue }]}
              >
                Maybe later
              </Text>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

/* const mapStateToProps = createStructuredSelector({
    marked: selectQuoteMarked
});  */
/* const mapDispatchToProps = (dispatch) => ({
  // toggleFavorite: () => dispatch(toggleFavorite()),
  addQuote: (picture) => dispatch(addQuote(picture)),
});
 */
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  iconsContainer: {
    width: "100%",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    width: 65,
    height: 65,
    borderRadius: 50,
    backgroundColor: colors.opacityBlack,
  },
  iconText: {
    color: colors.white,
    fontFamily: fonts.text,
  },
  label: {
    justifyContent: "center",
    alignItems: "center",
  },
  labelText: {
    color: colors.white,
    fontFamily: fonts.title,
    fontSize: 18,
    textTransform: "uppercase",
  },
  button: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  ctaContainer: {
    width: "90%",
    height: 60,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  // Modal
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
  modalView: {
    borderRadius: 12,
    alignItems: "center",
    width: "90%",
    height: 500,
    backgroundColor: colors.white,
    overflow: "hidden",
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

  modalTitle: {
    marginTop: 50,
    fontFamily: fonts.title,
    fontSize: 20,
    textAlign: "center",
    color: colors.lightgray,
  },
  modalText: {
    color: colors.lightgray,
    marginTop: 20,
    lineHeight: 20,
    width: "90%",
    fontFamily: fonts.text,
    fontSize: 18,
    textAlign: "center",
  },
  openButton: {
    marginTop: 20,
    alignItems: "center",
    width: 200,
    padding: 16,
    backgroundColor: colors.primary,
    borderRadius: 12,
  },
  textStyle: {
    fontFamily: fonts.text,
    color: "white",
    fontSize: 16,
  },
});

export default ShowImage;

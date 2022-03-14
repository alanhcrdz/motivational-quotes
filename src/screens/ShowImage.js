import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Modal,
  TouchableHighlight,
  ActivityIndicator,
  Platform,
} from "react-native";
import { useDataContext } from "../hooks/useDataContext";

//share and download images feature
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import {
  AntDesign,
  Entypo,
  MaterialIcons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
import colors from "../constants/colors";
import { Notifier, Easing } from "react-native-notifier";
import fonts from "../constants/fonts";
import Constants from "expo-constants";

//redux
import { createStructuredSelector } from "reselect";
import { selectQuoteMarked } from "../redux/quotes/quotes.selectors";
import { toggleFavorite, addQuote } from "../redux/quotes/quotes.actions";
import { QuotesActionTypes } from "../redux/quotes/quotes.types";
import { Favorite } from "../components/favorites/favorites.component";

const ShowImage = ({ route, navigation, quote = {} }) => {
  const [iconShow, setIconShow] = useState("none");
  const { adLoading, showRewarded } = useDataContext();
  const { picture, category, name } = route.params;

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

  /*  const downloadFile = async () => {
        const uri = picture;
        let fileUri = FileSystem.documentDirectory + 'quotes.png';
        FileSystem.downloadAsync(uri, fileUri)
            .then(({ uri }) => {
                saveFile(uri)
            })
            .catch(error => {
                console.error(error);
            })

    } */

  /* const saveFile = async (fileUri) => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status === "granted") {
            try {
                MediaLibrary.requestPermissionsAsync()
                const asset = await MediaLibrary.createAssetAsync(fileUri);
                await MediaLibrary.createAlbumAsync("Global Motivate", asset, false)
                Notifier.showNotification({
                    title: 'Image Downloaded',
                    description: 'File has been saved on your phone.',
                    duration: 3000,
                    showAnimationDuration: 800,
                    showEasing: Easing.ease,
                    hideOnPress: false,
                    queueMode: 'immediate',

                })

            } catch (err) {
                console.log("Save error: ", err)
            }
        }
    } */
  /*  // sharing
    const source = picture;
    const onShare = () => {
        FileSystem.downloadAsync(
            source,
            FileSystem.documentDirectory + '.png'
        )
            .then(({ uri }) => {
                console.log('finished download to ' + uri);

                Sharing.shareAsync(uri)
            })
            .catch(error => {
                console.error(error);
            });
    } */

  // after favorite
  /* const showNotifier = () => {
    Notifier.showNotification({
      title: marked ? "Added to Favorites" : "Removed from Favorites",
      description: marked
        ? "Your quote now is on favorite list!"
        : "Quote Removed from Favorites.",
      duration: 3000,
      showAnimationDuration: 800,
      showEasing: Easing.ease,
      hideOnPress: false,
      queueMode: "immediate",
    });
  }; */

  // Capitalize

  return (
    <TouchableWithoutFeedback onPress={toggleFade}>
      <ImageBackground style={styles.image} source={picture}>
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

          {/* <TouchableOpacity onPress={downloadFile}>
                        <View style={[styles.icon, { display: iconShow }]}>
                            <Feather
                                style={{ margin: 20 }}
                                name="download"
                                size={24} color={colors.white}

                            />
                        </View>
                        <View style={styles.label}>
                            <Text style={[styles.iconText, { display: iconShow }]}>Download</Text>
                        </View>
                    </TouchableOpacity> */}

          {/*  <TouchableOpacity onPress={onShare}>
                        <View style={[styles.icon, { display: iconShow }]}>
                            <AntDesign
                                style={{ margin: 20 }}
                                name="instagram"
                                size={24} color={colors.white}

                            />
                        </View>
                        <View style={styles.label}>
                            <Text style={[styles.iconText, { display: iconShow }]}>Share</Text>
                        </View>
                    </TouchableOpacity> */}

          {/* FAVORITES FEATURE WILL BE ADDED LATER, AFTER STUDY MORE!!! */}
          {/*  <TouchableOpacity>
            <View style={[styles.icon, { display: iconShow }]}>
              <Favorite quote={quote} />
            </View>
            <View style={styles.label}>
              <Text style={[styles.iconText, { display: iconShow }]}>Add</Text>
            </View>
          </TouchableOpacity> */}
        </Animated.View>
        {/*  <Animated.View
          style={[
            c,
            { opacity: fadeAnim, display: iconShow },
          ]}
        >
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.4}
            onPress={handleModalVisibility}
          >
            <AntDesign name="camera" size={22} color={colors.white} />
            <View style={styles.label}>
              <Text style={styles.labelText}> More {name} Quotes! </Text>
            </View>
          </TouchableOpacity>
        </Animated.View> */}

        {/* MODAL FOR LOADING AD */}
        {/* <Modal animationType="slide" visible={modalVisible} transparent>
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
                Wanna see more Beautiful Pictures like this?
              </Text>

              <TouchableHighlight
                style={{ ...styles.openButton }}
                onPress={() => {
                  if (
                    category === "motivationalsuccess" ||
                    category === "motivationallove"
                  ) {
                    showRewarded();
                  }
                  navigation.navigate("WebScreen", {
                    category,
                  });
                  setModalVisible(false);
                }}
              >
                <View>
                  {adLoading ? (
                    <ActivityIndicator size={20} color={colors.white} />
                  ) : (
                    <Text style={styles.textStyle}>Check Creators Gallery</Text>
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
        </Modal> */}
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
    backgroundColor: colors.accent,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});

export default ShowImage;

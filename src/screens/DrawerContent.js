import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  Linking,
  Platform,
  Image,
} from "react-native";
import { Avatar, Title, Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

import {
  Feather,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  EvilIcons,
} from "@expo/vector-icons";
import colors from "../constants/colors";
import fonts from "../constants/fonts";
import { Link } from "@react-navigation/native";

// Rate system
// import * as StoreReview from 'expo-store-review';

function DrawerContent({ otherProps, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  // MODAL
  const handleModalVisibility = () => {
    setModalVisible(true);
  };

  // Open the iOS App Store in the browser -> redirects to App Store on iOS

  const handleAppReview = () => {
    const androidPackageName = "com.globalpromotions.motivationalquotes";
    const itunesItemId = "1598740990"; // APPLE ID
    /* if (await StoreReview.hasAction()) {
            StoreReview.requestReview()
          } */
    if (Platform.OS === "android") {
      Linking.openURL(
        `https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`
      );
    } else {
      Linking.openURL(
        `https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`
      );
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...otherProps}>
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: "row", marginTop: 15 }}>
                <Avatar.Image
                  source={require("../assets/logo.png")}
                  size={60}
                />
                <View style={{ marginLeft: 15, flexDirection: "column" }}>
                  <Title style={styles.appTitle}>Motivational Quotes</Title>
                  {/* <Caption style={styles.caption}>Inspirational Quotes</Caption> */}
                </View>
              </View>
            </View>

            <Drawer.Section title="Main" style={styles.drawerSection}>
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialIcons name="explore" color={color} size={size} />
                )}
                label="Explore"
                onPress={() => {
                  navigation.navigate("Inspire");
                }}
              />
              {/* <DrawerItem
                icon={() => (
                  <AntDesign
                    name="heart"
                    color={colors.opacityBlack}
                    size={24}
                  />
                )}
                label="Favorites"
                onPress={() => {
                  navigation.navigate("Favorites");
                }}
              /> */}
              {/* <DrawerItem
                                icon={({ color, size }) => (
                                    <AntDesign
                                        name='picture'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Random Images"
                                onPress={() => {navigation.navigate('Random Images') }}
                            /> */}
              {/*  <DrawerItem
                                icon={({ color, size }) => (
                                    <Entypo
                                        name='quote'
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Only Text"
                                onPress={() => { navigation.navigate('Random') }}
                            /> */}
            </Drawer.Section>

            <Drawer.Section title="Social">
              <DrawerItem
                icon={({ color, size }) => (
                  <Feather name="instagram" color={color} size={size} />
                )}
                label="Follow us"
                onPress={() => {
                  Linking.openURL(
                    "https://www.instagram.com/globalpromotionscanada/"
                  );
                }}
              />

              {/* <DrawerItem
                icon={({ color, size }) => (
                  <AntDesign name="infocirlceo" color={color} size={size} />
                )}
                label="About us"
                onPress={() => {
                  navigation.navigate("About");
                }}
              /> */}
              <DrawerItem
                icon={({ color, size }) => (
                  <Entypo name="globe" color={color} size={size} />
                )}
                label="Visit our website"
                onPress={() => {
                  Linking.openURL("https://globalpromotions.ca/");
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Entypo name="mobile" color={color} size={size} />
                )}
                label="More Apps"
                onPress={() => {
                  Linking.openURL(
                    "https://play.google.com/store/apps/dev?id=8341975679786746388"
                  );
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <Entypo name="star-outlined" color={color} size={size} />
                )}
                label="Leave Feedback"
                onPress={handleModalVisibility}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  <MaterialIcons name="privacy-tip" color={color} size={size} />
                )}
                label="Privacy Policy"
                onPress={() => {
                  Linking.openURL("https://globalpromotions.ca/privacy-policy");
                }}
              />
              {/*  <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name='email'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Contact"
                            onPress={() =>{}}
                        /> */}
            </Drawer.Section>
            {/*<Drawer.Section title="Membership" >
                                
                                 <DrawerItem
                            icon={({ color, size }) => (
                                <MaterialCommunityIcons
                                    name='crown-outline'
                                    color={color}
                                    size={size}
                                />
                            )}
                            label="Go Premium"
                            onPress={() =>{}}
                    </Drawer.Section>  
                        /> */}
          </View>
        </DrawerContentScrollView>
        {/* <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Feather name="settings" color={color} size={size} />
            )}
            label="Settings"
            onPress={() => navigation.navigate("Settings")}
          />
        </Drawer.Section> */}
      </View>
      <Modal animationType="slide" visible={modalVisible} transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeader}>
              <Image
                source={require("../assets/feedback.png")}
                style={styles.rateImage}
              />
              <TouchableOpacity
                style={styles.close}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <AntDesign name="closecircleo" size={24} color="white" />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.title}>Enjoying Motivational Quotes?</Text>
            </View>
            <View style={styles.starsContainer}>
              <EvilIcons name="star" size={26} color="gold" />
              <EvilIcons name="star" size={26} color="gold" />
              <EvilIcons name="star" size={26} color="gold" />
              <EvilIcons name="star" size={26} color="gold" />
              <EvilIcons name="star" size={26} color="gold" />
            </View>
            <Text style={styles.modalText}>Show us what you think!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton }}
              onPress={handleAppReview}
            >
              <View>
                <Text style={styles.textStyle}>
                  {Platform.OS === "android"
                    ? "Rate Us on Google Play"
                    : "Rate Us on App Store"}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },

  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },

  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  // MODAL STYLE
  centeredView: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    borderRadius: 12,
    alignItems: "center",
    width: "90%",
    height: 500,
    backgroundColor: colors.white,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  rateImage: {
    width: 200,
    height: 200,
    position: "absolute",
    top: 20,
  },
  modalHeader: {
    alignItems: "center",
    width: "100%",
    height: 200,
    backgroundColor: colors.primary,
  },
  openButton: {
    borderRadius: 8,
    padding: 16,
    elevation: 2,
    width: 250,
    backgroundColor: colors.primary,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
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
  close: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  appTitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    marginTop: 50,
    fontFamily: fonts.title,
    fontSize: 20,
    textAlign: "center",
    color: colors.lightgray,
  },
});

export default DrawerContent;

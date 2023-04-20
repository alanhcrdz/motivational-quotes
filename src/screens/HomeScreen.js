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
  // firestore database
  // const { isConnected } = useDataContext();
  
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
      return () => {
        backHandler.remove();
      }
    } else {
      BackHandler.removeEventListener("hardwareBackPress");

    }
  }, []);

  
 

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
          
          style={[styles.list, {backgroundColor: colors.opacityBlack}]}
        >
          <ImageBackground
            style={styles.background}
            source={item.background}
            imageStyle={{ opacity: 0.6 }}
          >
            <Text style={[styles.title_dark, { color: "#fff" }]}>
              {item.title}
            </Text>
          </ImageBackground>
        </TouchableOpacity>
      </>
    );
  };
  
  return (
    <View style={styles.container_light}>
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

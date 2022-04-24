import React from "react";
import { View, Text, StyleSheet, Image, Linking } from "react-native";
import colors from "../constants/colors";
import fonts from "../constants/fonts";

function AboutUs() {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image
            source={require("../assets/inspired.png")}
            style={styles.storeImage}
          />
        </View>
        <Text style={styles.title}>About Motivational Quotes</Text>

        <Text style={styles.text}>
          Motivational Quotes is a dynamic app built with content from our
          community members worldwide. This app is part of our Arts for Change
          Collection. Through art, we can grow, heal and prosper. Join us and
          together we can create a better tomorrow!{" "}
        </Text>
        <Text
          style={{ color: "blue", marginTop: 10 }}
          onPress={() => {
            Linking.openURL("https://artzforchange.com/");
          }}
        >
          https://artzforchange.com
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.background,
  },
  wrapper: {
    width: "100%",
    height: 500,
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: "hidden",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    width: "100%",
    height: 200,
    backgroundColor: colors.primary,
  },
  storeImage: {
    width: 200,
    height: 200,
    position: "absolute",
    top: 20,
  },
  title: {
    marginTop: 50,
    fontFamily: fonts.title,
    fontSize: 22,
    lineHeight: 22,
    color: colors.lightgray,
  },
  text: {
    marginTop: 30,
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 25,
    color: colors.lightgray,
    textAlign: "center",
  },
  span: {
    color: colors.accent,
  },
  imageWrapper: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default AboutUs;

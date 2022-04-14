import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import fonts from "../constants/fonts";
import colors from "../constants/colors";
import { Switch } from "react-native-paper";

//changing theme
// redux hooks
// import { switchMode } from "../redux/theme/theme.actions";

const Settings = () => {
  return (
    <View style={styles.container_light}>
      <View style={styles.listItem}>
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={24}
          color={"#000"}
        />
        <Text style={styles.text_light}>Enable Dark Mode</Text>
      </View>
      <Switch
        style={styles.switch}
        value={isSwitchOn}
        onValueChange={() => {
          console.log("changed");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container_light: {
    flex: 1,
    flexDirection: "row",
    padding: 12,
    backgroundColor: colors.white,
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  },

  container_dark: {
    flex: 1,
    flexDirection: "row",
    padding: 12,
    backgroundColor: colors.background,
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  text_light: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: fonts.text,
    color: colors.lightgray,
  },

  text_dark: {
    fontSize: 16,
    marginLeft: 10,
    fontFamily: fonts.text,
    color: colors.white,
  },
  switch: {
    marginTop: 20,
  },
});

export default Settings;

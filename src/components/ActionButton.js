import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../constants/colors";
import fonts from "../constants/fonts";

function ActionButton({ onPress, title, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.button}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: colors.action,
  },
  text: {
    fontSize: 20,
    fontFamily: fonts.text,
    color: colors.white,
    textAlign: "left",
  },
});
export default ActionButton;

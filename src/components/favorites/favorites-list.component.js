import React, { useEffect, useMemo, useState, useCallback, memo } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
// import ActionButton from '../components/ActionButton';
import colors from "../../constants/colors";
import fonts from "../../constants/fonts";
import { useDataContext } from "../../hooks/useDataContext";

function FavoritesList({ navigation, favorites }) {
  if (!favorites.length) {
    return (
      <View style={styles.emptyWrapper}>
        <Text style={styles.empty}>
          No Favorite pictures found. Try to Add some!
        </Text>
      </View>
    );
  }
  return (
    <View
      style={[
        styles.container,
        { alignItems: favorites.length <= 2 ? "flex-start" : "center" },
      ]}
    >
      {favorites.map((picture) => {
        const key = picture.id;
        return (
          <>
            <TouchableOpacity
              key={key}
              style={styles.imgContainer}
              onPress={() =>
                navigation.navigate("ShowImage", {
                  picture,
                })
              }
            >
              <ImageBackground style={styles.picture} source={picture} />

              <View>
                {/*<MaterialIcons onPress={() => {
                        addQuote(item)
                    }}
                            style={{ margin: 20 }}
                            name={marked ? 'favorite' : 'favorite-outline'}
                            size={24} color={colors.white}
                /> */}
              </View>
            </TouchableOpacity>
          </>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    justifyContent: "space-between",
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
  imgContainer: {
    width: 180,
    padding: 6,
    justifyContent: "center",
  },
  picture: {
    borderRadius: 8,
    overflow: "hidden",
    width: "100%",
    height: 280,
    backgroundColor: colors.opacityWhite,
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
  emptyWrapper: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    color: colors.accent,
    fontFamily: fonts.text,
    fontSize: 18,
    alignSelf: "center",
    marginTop: 40,
    width: 250,
    textAlign: "center",
  },
});

export default FavoritesList;

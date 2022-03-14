import React, { useState } from "react";
import { ActivityIndicator, ImageBackground } from "react-native";
import styled from "styled-components/native";
import { View, Text, StyleSheet } from "react-native";

// import ActionButton from '../components/ActionButton';
import { useDataContext } from "../hooks/useDataContext";
import FavoritesList from "../components/favorites/favorites-list.component";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { Favorite } from "../components/favorites/favorites.component";
import colors from "../constants/colors";

const LoadingContainer = styled.View`
  position: absolute;
  left: 50%;
  top: 50%;
`;
const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
function Favorites({ navigation }) {
  const [isToggled, setIsToggled] = useState(false);

  const { favorites, loading } = useDataContext();

  const renderItem = ({ item }) => {
    const { quote } = item;

    return (
      <>
        <TouchableOpacity style={styles.imgContainer}>
          <ImageBackground style={styles.picture} source={quote} />

          <View>
            <Favorite picture={quote} />
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      {favorites.length ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View>
          <Text>No Favorites</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imgContainer: {
    width: "50%",
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
});

export default Favorites;

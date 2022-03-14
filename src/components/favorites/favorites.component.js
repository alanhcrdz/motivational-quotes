import React from "react";
import { TouchableOpacity } from "react-native";
import { useDataContext } from "../../hooks/useDataContext";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components/native";

const FavoriteButton = styled(TouchableOpacity)`
  margin-top: 10px;
`;
export const Favorite = ({ picture }) => {
  const { favorites, addToFavorites, removeFromFavorites } = useDataContext();
  const isFavorite = favorites.find((p) => p.id === picture.id);

  return (
    <FavoriteButton
      onPress={() => {
        !isFavorite ? addToFavorites(picture) : removeFromFavorites(picture);
      }}
    >
      <AntDesign
        name={isFavorite ? "heart" : "hearto"}
        size={24}
        color={isFavorite ? "red" : "white"}
      />
    </FavoriteButton>
  );
};

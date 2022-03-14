import React from "react";
import { WebView } from "react-native-webview";

function WebScreen({ route }) {
  // const { category, creatorId } = route.params;
  return (
    <WebView
      source={{ uri: `https://globalpromotions.ca/community-gallery` }}
      style={{ opacity: 0.99 }}
    />
  );
}

export default React.memo(WebScreen);

import React from "react";
import { WebView } from "react-native-webview";

function WebScreen({ route }) {
  const { slug } = route.params;
  return (
    <WebView
      source={{ uri: `https://globalpromotions.ca/${slug}-gallery` }}
      style={{ opacity: 0.99 }}
    />
  );
}

export default React.memo(WebScreen);

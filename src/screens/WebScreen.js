import React from "react";
import { WebView } from "react-native-webview";

function WebScreen({ route }) {
  const { slug } = route.params;
  return (
    <WebView
      source={{ uri: `https://artzforchange.com/${slug}-gallery` }}
      style={{ opacity: 0.99 }}
    />
  );
}

export default React.memo(WebScreen);

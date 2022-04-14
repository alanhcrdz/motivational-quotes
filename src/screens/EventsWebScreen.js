import React from "react";
import { WebView } from "react-native-webview";

function EventsWebScreen({ route }) {
  return (
    <WebView
      source={{
        uri: `https://globalpromotions.ca/arts-for-change-auction/`,
      }}
      style={{ opacity: 0.99 }}
    />
  );
}

export default React.memo(EventsWebScreen);

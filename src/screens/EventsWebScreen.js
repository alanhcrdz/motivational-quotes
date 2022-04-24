import React from "react";
import { WebView } from "react-native-webview";

function EventsWebScreen({ route }) {
  return (
    <WebView
      source={{
        uri: `https://artzforchange.com/arts-for-change/`,
      }}
      style={{ opacity: 0.99 }}
    />
  );
}

export default React.memo(EventsWebScreen);

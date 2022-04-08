import React from "react";
import { WebView } from "react-native-webview";

function CreatorStore({ route }) {
  const { user_store } = route.params;
  return (
    <WebView source={{ uri: `${user_store}` }} style={{ opacity: 0.99 }} />
  );
}

export default React.memo(CreatorStore);

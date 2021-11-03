import React from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';

function WebScreen({ route }) {

   const { category, creatorId } = route.params;
    return (
        <>
      
    <WebView source={{ uri: `https://www.astrolight.ca/${category}-${creatorId}` }}
    showsHorizontalScrollIndicator/>
    </>
    )
}

export default React.memo(WebScreen);

import React from 'react';
import { WebView } from 'react-native-webview';

function WebScreen({ route }) {

   const { category } = route.params;
    return (
        <>
      
        <WebView source={{ uri: `https://www.globalpromotions.ca/${category}` }}
    showsHorizontalScrollIndicator/>
    </>
    )
}

export default React.memo(WebScreen);

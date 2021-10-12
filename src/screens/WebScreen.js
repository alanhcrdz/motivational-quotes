import React from 'react';
import { WebView } from 'react-native-webview';

function WebScreen({ route }) {

   const { category } = route.params;
    return (
        <>
        {console.log(`http://astrolight.ca/astrolight/${category}`)}
        <WebView source={{ uri: `http://astrolight.ca/astrolight/${category}` }}
    showsHorizontalScrollIndicator/>
    </>
    )
}

export default React.memo(WebScreen);

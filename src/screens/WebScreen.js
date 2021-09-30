import React from 'react';
import { WebView } from 'react-native-webview';

function WebScreen() {
    return (
        <WebView source={{ uri: 'http://astrolight.ca/astrolight' }}
    showsHorizontalScrollIndicator/>
    )
}

export default WebScreen;

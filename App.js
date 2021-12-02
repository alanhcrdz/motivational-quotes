import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import AppLoading from 'expo-app-loading';
import Toast from 'react-native-toast-message';
import {
useFonts,
Ubuntu_400Regular,
Ubuntu_700Bold
} from '@expo-google-fonts/ubuntu';
import Routes from './src/routes/index';
import { DataContextProvider } from './src/hooks/useDataContext';
import { NotifierWrapper } from 'react-native-notifier';
import { Provider as PaperProvider } from 'react-native-paper';

// BANNER ANDROID ID: ca-app-pub-3940256099942544/6300978111 (TEST ID, REPLACE AFTER)
// INTERSTITIAL ANDROID ID: ca-app-pub-3940256099942544/1033173712 (TEST ID, REPLACE AFTER)
// INTERSTITIAL VIDEO ANDROID ID: ca-app-pub-3940256099942544/8691691433 (TEST ID, REPLACE AFTER)

export default function App() {


  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Ubuntu_400Regular,
  })

  if (!fontsLoaded)
    return <AppLoading />

  return (
    <Provider store={store} >
      <PaperProvider>
        <NotifierWrapper>
          <DataContextProvider>
            <Routes />
            <Toast />
          </DataContextProvider>
        </NotifierWrapper>
      </PaperProvider>
    </Provider>





  );


}





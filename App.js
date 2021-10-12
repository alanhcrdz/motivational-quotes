import 'react-native-gesture-handler';
import React from 'react';
import AppLoading from 'expo-app-loading';
import {
useFonts,
Ubuntu_400Regular,
Ubuntu_700Bold
} from '@expo-google-fonts/ubuntu';
import Routes from './src/routes/index';
import { DataContextProvider } from './src/hooks/useDataContext';
import { NotifierWrapper } from 'react-native-notifier';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import quotesReducer from './src/store/reducers/quotes';

// BANNER ANDROID ID: ca-app-pub-3940256099942544/6300978111 (TEST ID, REPLACE AFTER)
// INTERSTITIAL ANDROID ID: ca-app-pub-3940256099942544/1033173712 (TEST ID, REPLACE AFTER)
// INTERSTITIAL VIDEO ANDROID ID: ca-app-pub-3940256099942544/8691691433 (TEST ID, REPLACE AFTER)

export default function App() {

  const rootReducer = combineReducers({
    quotes: quotesReducer
  })
  const store = createStore(rootReducer);

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
          </DataContextProvider>
        </NotifierWrapper>
      </PaperProvider>
    </Provider>





  );


}





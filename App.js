import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import AppLoading from "expo-app-loading";
import Toast from "react-native-toast-message";
import {
  useFonts,
  Ubuntu_400Regular,
  Ubuntu_700Bold,
} from "@expo-google-fonts/ubuntu";
import Routes from "./src/routes/index";
import { DataContextProvider, useDataContext } from "./src/hooks/useDataContext";
import { NotifierWrapper } from "react-native-notifier";
import { Provider as PaperProvider } from "react-native-paper";
import NetInfo from '@react-native-community/netinfo'

//firebase
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";
import OfflineNotice from "./src/components/OfflineNotice";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,

  authDomain: `${AUTH_DOMAIN}`,

  projectId: `${PROJECT_ID}`,

  storageBucket: `${STORAGE_BUCKET}`,

  messagingSenderId: `${MESSAGING_SENDER_ID}`,

  appId: `${APP_ID}`,
  measurementId: `${MEASUREMENT_ID}`,
};

initializeApp(firebaseConfig);

// initalizing analytics log events
// const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//logEvent(analytics, 'notification_received')

export default function App() {
  const [isConnected, setIsConnected] = useState()
  const [netInfo, setNetInfo] = useState('');

  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Ubuntu_400Regular,
  });
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setNetInfo(
        `Connection type: ${state.type}
        Is connected? ${state.isConnected}
        Ip Address: ${state.details.ipAddress}`
      )
      setIsConnected(state.isConnected)
    });
    return () => {
      unsubscribe();
    }
  })

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NotifierWrapper>
            <DataContextProvider>
              {
                !isConnected ? <OfflineNotice /> :
                <Routes />
              }
              <Toast />
            </DataContextProvider>
          </NotifierWrapper>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

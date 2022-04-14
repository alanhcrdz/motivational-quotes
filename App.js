import "react-native-gesture-handler";
import React, { useEffect } from "react";
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
import { DataContextProvider } from "./src/hooks/useDataContext";
import { NotifierWrapper } from "react-native-notifier";
import { Provider as PaperProvider } from "react-native-paper";

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
  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Ubuntu_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <NotifierWrapper>
            <DataContextProvider>
              <Routes />
              <Toast />
            </DataContextProvider>
          </NotifierWrapper>
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
}

import "react-native-gesture-handler";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
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
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore();

export default function App() {
  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Ubuntu_400Regular,
  });

  if (!fontsLoaded) return <AppLoading />;

  async function createQuotes() {
    try {
      const docRef = await addDoc(collection(db, "quotes"), {
        category: "motivationallove",
        author: "Francois de La Rochefoucauld",
        content:
          "True love is like ghosts, which everyone talks about and few have seen.",
        picture:
          "https://firebasestorage.googleapis.com/v0/b/motivational-app-971d2.appspot.com/o/love%2F01.png?alt=media&token=ddb1d322-235d-4eaf-825a-86936a2489ec",
        creator: {
          username: "Joseph Ranford",
          membership: "free",
          user_store: "https://globalpromotions.ca/profile/?zathoz/products",
        },
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  }

  return (
    <Provider store={store}>
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

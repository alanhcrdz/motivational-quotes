import { legacy_createStore as createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

//persisting
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import quotesReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";

//import rootReducer from "./root-reducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["favorites"],
};

const rootReducer = combineReducers({
  quotesReducer: persistReducer(persistConfig, quotesReducer),
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export const persistor = persistStore(store);

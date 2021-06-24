import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import userReducer from "./user-action/fetch-login.js";
import customizeIdReducer from "./customize-action/customize-id";
import customizeInfoReducer from "./customize-action/customize-info";
import productFilterReducer from "./product-action/fetch-filter";
import cateFishForFilterReducer from "./product-action/fetch-cate-fish";
import isCaptureReducer from "./customize-action/capture-model";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist/es/constants";

const customizeReducer = {
  isCapture: isCaptureReducer,
  customizeId: customizeIdReducer,
  customizeInfo: customizeInfoReducer,
  productFilter: productFilterReducer,
};

const rootReducer = {
  userLogin: userReducer,
  cateFishForFilter: cateFishForFilterReducer,
  ...customizeReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);
export default store;
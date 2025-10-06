import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.slice";
import toastsReducer from "./toasts.slice";
import { combineReducers } from "redux";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["theme", "languages"],
};
const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: "auth",
      storage,
      whitelist: ["user", "tokens"],
    },
    authReducer
  ),
  toasts: toastsReducer,
});

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

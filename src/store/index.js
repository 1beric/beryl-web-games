import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { encryptTransform } from "redux-persist-transform-encrypt";
import thunk from "redux-thunk";
import reducer from "./reducers";

const encryptor = encryptTransform({
  secretKey: "0c9984e8-459c-4361-865f-6ca0ac778ca3",
});

const persistConfig = {
  key: "root",
  storage,
  transforms: [encryptor],
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);

export default store;

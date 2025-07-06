// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import subjectReducer from "./subjectSlice";

const authPersistConfig = {
  key: "auth",
  storage,
};
const subjectPersistConfig = {
  key: "subjects",
  storage,
  whitelist: ["subjectMap"], // Only persist subjectMap
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedSubjectReducer = persistReducer(subjectPersistConfig, subjectReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    subjects: persistedSubjectReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
          "persist/PAUSE",
          "persist/PURGE",
        ],
      },
    }),
  devTools: import.meta.env.MODE !== "production",
});

const persistor = persistStore(store);

export { store, persistor };

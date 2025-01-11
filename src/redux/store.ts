import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import authReducer from './slices/authSlice';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage for React Native
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// Configure the store
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for Redux Persist
    }),
});

// Persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

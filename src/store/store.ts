import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import authSlice from '@/features/authSlice';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

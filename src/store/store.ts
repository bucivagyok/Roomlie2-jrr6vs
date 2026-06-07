import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { roomlieApi } from './roomlieApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [roomlieApi.reducerPath]: roomlieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(roomlieApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
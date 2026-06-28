import { configureStore } from "@reduxjs/toolkit";
import EmailReducer from './EmailSlice'

export const store = configureStore({
  reducer: {
    email: EmailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
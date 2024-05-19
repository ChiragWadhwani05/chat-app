import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux-slices/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

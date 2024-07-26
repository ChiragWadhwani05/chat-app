import { configureStore } from '@reduxjs/toolkit';
import authReducer from './redux-slices/auth';
import chatReducer from './redux-slices/chats';

export const store = configureStore({
  reducer: {
    [authReducer.name]: authReducer.reducer,
    [chatReducer.name]: chatReducer.reducer,
  },
});

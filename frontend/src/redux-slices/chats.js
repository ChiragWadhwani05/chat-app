import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'https://chat-app-production-4500.up.railway.app/api/v1/user';
const API_URL = 'http://localhost:1212/api/v1/chat';
axios.defaults.withCredentials = true;

const initialState = {
  chats: null,
  isLoading: false,
  error: null,
  success: false,
};

export const getChats = createAsyncThunk('getChats', async () => {
  const response = await axios.get(`${API_URL}/get-all-chats`, {
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(response.data);
  return response.data.data;
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.chats = action.payload;
      })
      .addCase(getChats.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default chatSlice;

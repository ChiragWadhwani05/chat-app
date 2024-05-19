import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/users';

export const registerUser = createAsyncThunk('registerUser', async (data) => {
  const response = await axios.post(`${API_URL}/register`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.json;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    user: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;

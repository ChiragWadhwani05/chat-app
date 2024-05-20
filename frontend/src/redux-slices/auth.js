import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://chat-app-production-4500.up.railway.app/api/v1/user';
axios.defaults.withCredentials = true;

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};
export const registerUser = createAsyncThunk('registerUser', async (data) => {
  let response = await axios.post(`${API_URL}/register`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.data.success === true) {
    response = await axios.post(`${API_URL}/login`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
  console.log(response.data);
  return response.data;
});

export const loginUser = createAsyncThunk('loginUser', async (data) => {
  const response = await axios.post(`${API_URL}/login`, data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
});

export const getSelf = createAsyncThunk('getSelf', async () => {
  const response = await axios.get(`${API_URL}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(response.data);
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // userExists: (state, action) => {
    //   state.user = action.payload;
    //   state.loader = false;
    // },
    // userNotExists: (state) => {
    //   state.user = null;
    //   state.loader = false;
    // },
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
        state.isLoading = false;
        state.user = null;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state) => {
        state.user = null;
      });
    builder
      .addCase(getSelf.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSelf.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getSelf.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;

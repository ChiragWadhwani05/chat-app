import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://chat-app-production-4500.up.railway.app/api/v1/user';
axios.defaults.withCredentials = true;

const initialState = {
  user: null,
  isLoading: false,
  isAuthenticated: false,
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

export const loginUser = createAsyncThunk(
  'loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data);
      console.log(response.data);
      return response.data.data.user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSelf = createAsyncThunk('getSelf', async () => {
  const response = await axios.get(`${API_URL}`, {
    headers: { 'Content-Type': 'application/json' },
  });
  console.log(response.data);
  return response.data.data;
});

export const logoutUser = createAsyncThunk('logoutUser', async () => {
  const response = await axios.get(`${API_URL}/logout`, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
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
        state.isAuthenticated = true;
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
        state.isAuthenticated = true;
      })
      .addCase(getSelf.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  },
});

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;

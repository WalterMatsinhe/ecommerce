import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  '/auth/register',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        formData,
        { withCredentials: true }
      );

      // Ensure backend returns { success: true } on success
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { success: false, message: 'Unknown error' }
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  '/auth/login',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData,
        { withCredentials: true }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { success: false, message: 'Unknown error' }
      );
    }
  }
);
export const checkAuth = createAsyncThunk(
  '/auth/checkauth',
  async () => {
      const response = await axios.get(
        'http://localhost:5000/api/auth/check-auth',
        {
          withCredentials : true,
          headers: {
            'Cache-Control': 'no-store, no-cache,must-revalidate, proxy-revalidate',
          }
        }
      );
      return response.data;
  }
);
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user || null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
        .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);

        state.isLoading = false;
        state.user = action.payload.success ? action.payload.
        user : null;
        state.isAuthenticated = action.payload.success? true : false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

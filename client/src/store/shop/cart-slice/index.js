import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ FIXED: Add credentials for authentication
axios.defaults.withCredentials = true;

const API_BASE = "http://localhost:5000/api/shop/cart";

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

// ADD TO CART
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_BASE}/add`, {
        userId,
        productId,
        quantity,
      });
      return data; // Expecting the backend to return full cart array
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { success: false, message: "Failed to add to cart" }
      );
    }
  }
);

// FETCH CART ITEMS
export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_BASE}/get/${userId}`);
      return data; // Expecting full cart array
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { success: false, message: "Failed to fetch cart" }
      );
    }
  }
);

// DELETE ITEM
export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${API_BASE}/${userId}/${productId}`);
      return data; // Expecting updated cart array
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { success: false, message: "Failed to delete item" }
      );
    }
  }
);

// UPDATE QUANTITY
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_BASE}/update-cart`, {
        userId,
        productId,
        quantity,
      });
      return data; // Expecting updated cart array
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { success: false, message: "Failed to update quantity" }
      );
    }
  }
);

const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data || action.payload || []; // Handle different response formats
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // FETCH CART
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data || action.payload || [];
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // UPDATE QUANTITY
      .addCase(updateCartQuantity.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data || action.payload || [];
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // DELETE ITEM
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.data || action.payload || [];
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export const { clearError } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;
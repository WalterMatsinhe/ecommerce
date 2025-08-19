import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ✅ Ensure cookies/session are sent
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
      return data; // backend should return full cart
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
      return data; // backend should return full cart
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
      return data; // backend should return updated cart
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
      return data; // backend should return updated cart
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { success: false, message: "Failed to update quantity" }
      );
    }
  }
);

// CLEAR CART
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${API_BASE}/clear/${userId}`);
      return data; // backend may return the cart, but we won't rely on it
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { success: false, message: "Failed to clear cart" }
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
        state.cartItems = action.payload?.data ?? action.payload ?? [];
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
        state.cartItems = action.payload?.data ?? action.payload ?? [];
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
        state.cartItems = action.payload?.data ?? action.payload ?? [];
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
        state.cartItems = action.payload?.data ?? action.payload ?? [];
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // CLEAR CART — force empty immediately (optimistic UI)
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || action.error.message;
      });
  },
});

export const { clearError } = shoppingCartSlice.actions;
export default shoppingCartSlice.reducer;

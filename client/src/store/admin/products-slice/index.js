import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

// ADD NEW PRODUCT
export const addNewProduct = createAsyncThunk(
  '/products/addNewProduct',
  async (formData) => {
    const result = await axios.post('http://localhost:5000/api/admin/products/add', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result.data;
  }
);

// FETCH ALL PRODUCTS (fixed URL)
export const fetchAllProducts = createAsyncThunk(
  '/products/fetchAllProducts',
  async () => {
    const result = await axios.get('http://localhost:5000/api/admin/products/all'); // 👈 make sure this exists in your backend
    return result.data;
  }
);

// EDIT PRODUCT (fixed URL)
export const editProduct = createAsyncThunk(
  '/products/editProduct',
  async ({ id, formData }) => {
    const result = await axios.put(`http://localhost:5000/api/admin/products/edit/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return result.data;
  }
);

// DELETE PRODUCT (fixed URL)
export const deleteProduct = createAsyncThunk(
  '/products/deleteProduct',
  async (id) => {
    const result = await axios.delete(`http://localhost:5000/api/admin/products/delete/${id}`);
    return result.data;
  }
);

// SLICE
const AdminProductsSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload?.data || []; // ✅ handles undefined safely
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        console.error("Fetch products error:", action.error);
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default AdminProductsSlice.reducer;

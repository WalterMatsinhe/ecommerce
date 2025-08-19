import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails: null, 
};

export const fetchAllFilteredProducts = createAsyncThunk(
  '/products/fetchAllProducts',
  async ({ filterParams, sortParams }) => {
    console.log("fetchAllFilteredProducts params:", filterParams, sortParams);

    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams
    }).toString();

    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get?${query}`
    );

    return result.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  '/products/fetchProductDetails',
  async (id) => {
    const result = await axios.get(
      `http://localhost:5000/api/shop/products/get/${id}`
    );

    return result?.data;
  }
);

const shoppingProductSlice = createSlice({
  name: 'shoppingProducts',
  initialState,
  reducers: {
    setProductDetails: (state,) => {
      state.productDetails = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true; // loading should be true here
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        console.log("API Response:", action.payload);
        state.isLoading = false;
        state.productList = action.payload?.data || []; // ensure fallback if no data
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true; 
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        console.log("API Response:", action.payload);
        state.isLoading = false;
        state.productDetails = action.payload?.data || []; // ensure fallback if no data
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  }
});
export const {setProductDetails} = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;


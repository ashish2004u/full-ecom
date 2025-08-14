import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../App";

// =======================
// FETCH PRODUCTS (with optional filters)
// =======================
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params = {}, { rejectWithValue }) => {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await axios.get(`${backendUrl}/api/products/get-product?${query}`);
      return res.data.products;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =======================
// FETCH SINGLE PRODUCT BY ID
// =======================
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${backendUrl}/api/products/get-productId/${id}`);
      return res.data.product;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =======================
// ADD PRODUCT
// =======================
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendUrl}/api/products/add-product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.product;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =======================
// UPDATE PRODUCT
// =======================
export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${backendUrl}/api/products/update-product/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.product;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =======================
// DELETE PRODUCT
// =======================
export const deleteProductById = createAsyncThunk(
  "product/deleteProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${backendUrl}/api/products/delete-product/${id}`);
      return { id, message: res.data.message };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =======================
// SLICE
// =======================
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    loading: false,
    error: null,

    singleProduct: null,
    singleLoading: false,
    singleError: null,

    addStatus: "idle", // idle | loading | succeeded | failed
    addError: null,

    updateStatus: "idle", // idle | loading | succeeded | failed
    updateError: null,

    deleteStatus: "idle", // idle | loading | succeeded | failed
    deleteError: null,
    deleteSuccessMessage: null,
  },
  reducers: {
    clearSingleProduct(state) {
      state.singleProduct = null;
      state.singleLoading = false;
      state.singleError = null;
    },
    clearAddStatus(state) {
      state.addStatus = "idle";
      state.addError = null;
    },
    clearUpdateStatus(state) {
      state.updateStatus = "idle";
      state.updateError = null;
    },
    clearDeleteStatus(state) {
      state.deleteStatus = "idle";
      state.deleteError = null;
      state.deleteSuccessMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH PRODUCTS
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // FETCH SINGLE PRODUCT
      .addCase(fetchProductById.pending, (state) => {
        state.singleLoading = true;
        state.singleError = null;
        state.singleProduct = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.singleLoading = false;
        state.singleProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.singleLoading = false;
        state.singleError = action.payload || action.error.message;
      })

      // ADD PRODUCT
      .addCase(addProduct.pending, (state) => {
        state.addStatus = "loading";
        state.addError = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.addStatus = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.addStatus = "failed";
        state.addError = action.payload || action.error.message;
      })

      // UPDATE PRODUCT
      .addCase(updateProduct.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const updated = action.payload;
        const index = state.products.findIndex(
          (p) => p._id === updated._id || p.id === updated.id
        );
        if (index !== -1) {
          state.products[index] = updated;
        }
        if (
          state.singleProduct &&
          (state.singleProduct._id === updated._id ||
            state.singleProduct.id === updated.id)
        ) {
          state.singleProduct = updated;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || action.error.message;
      })

      // DELETE PRODUCT
      .addCase(deleteProductById.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
        state.deleteSuccessMessage = null;
      })
      .addCase(deleteProductById.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.products = state.products.filter(
          (p) => p._id !== action.payload.id && p.id !== action.payload.id
        );
        state.deleteSuccessMessage = action.payload.message;
      })
      .addCase(deleteProductById.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || action.error.message;
      });
  },
});

// =======================
// ACTIONS
// =======================
export const {
  clearSingleProduct,
  clearAddStatus,
  clearUpdateStatus,
  clearDeleteStatus,
} = productSlice.actions;

// =======================
// SELECTORS
// =======================
export const selectAllProducts = (state) => state.product.products;
export const selectProductsLoading = (state) => state.product.loading;
export const selectProductsError = (state) => state.product.error;

export const selectSingleProduct = (state) => state.product.singleProduct;
export const selectSingleProductLoading = (state) => state.product.singleLoading;
export const selectSingleProductError = (state) => state.product.singleError;

export const selectAddStatus = (state) => state.product.addStatus;
export const selectAddError = (state) => state.product.addError;
export const selectAddLoading = (state) => state.product.addStatus === "loading";
export const selectAddSuccess = (state) => state.product.addStatus === "succeeded"; // ✅ Added

export const selectUpdateStatus = (state) => state.product.updateStatus;
export const selectUpdateError = (state) => state.product.updateError;

export const selectDeleteStatus = (state) => state.product.deleteStatus;
export const selectDeleteError = (state) => state.product.deleteError;
export const selectDeleteSuccessMessage = (state) => state.product.deleteSuccessMessage;

export default productSlice.reducer;

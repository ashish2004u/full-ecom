import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../App";

// Fetch categories async thunk
export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    const response = await axios.get(`${backendUrl}/api/category/all-category`);
    return response.data; // assume backend returns array of categories
  }
);

// Delete category async thunk
export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${backendUrl}/api/category/delete-category/${id}`);
      return id; // return deleted category id for reducer to update state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete category");
    }
  }
);

// Update category async thunk
export const updateCategory = createAsyncThunk(
  "category/updateCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${backendUrl}/api/category/update-category/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.category; // backend returns updated category
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update category");
    }
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categoryData: [],
    loading: false,
    error: null,
    updateStatus: "idle", // idle | loading | succeeded | failed
    updateError: null,
    deleteStatus: "idle", // optional: track delete status separately
    deleteError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryData = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch categories";
      })

      // Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.deleteStatus = "loading";
        state.deleteError = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.categoryData = state.categoryData.filter(
          (cat) => cat.id !== action.payload && cat._id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload || action.error.message;
      })

      // Update category
      .addCase(updateCategory.pending, (state) => {
        state.updateStatus = "loading";
        state.updateError = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const updated = action.payload;
        const index = state.categoryData.findIndex(
          (cat) => cat._id === updated._id || cat.id === updated.id
        );
        if (index !== -1) {
          state.categoryData[index] = updated;
        }
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.updateError = action.payload || "Failed to update category";
      });
  },
});

// Selectors
export const selectAllCategory = (state) => state.category.categoryData;
export const selectCategoryLoading = (state) => state.category.loading;
export const selectCategoryError = (state) => state.category.error;

export const selectCategoryUpdateStatus = (state) => state.category.updateStatus;
export const selectCategoryUpdateError = (state) => state.category.updateError;

export const selectCategoryDeleteStatus = (state) => state.category.deleteStatus;
export const selectCategoryDeleteError = (state) => state.category.deleteError;

export default categorySlice.reducer;

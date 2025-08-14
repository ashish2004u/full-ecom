import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../App";

// Fetch all subcategories
export const fetchSubCategories = createAsyncThunk(
  "subCategory/fetchSubCategories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${backendUrl}/api/subcategory/all-subcategories`);
      console.log("Fetch SubCategories API response:", res.data);
      return res.data.subCategories; // <-- verify if this key exists in response
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// Add a subcategory
export const addSubCategory = createAsyncThunk(
  "subCategory/addSubCategory",
  async (subCategory, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendUrl}/api/subcategory/add-subcategory`, subCategory);
      return res.data.subCategory;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update a subcategory
export const updateSubCategory = createAsyncThunk(
  "subCategory/updateSubCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${backendUrl}/api/subcategory/update-subcategory/${id}`, data);
      return res.data.subCategory;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete a subcategory
export const deleteSubCategory = createAsyncThunk(
  "subCategory/deleteSubCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${backendUrl}/api/subcategory/delete-subcategory/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState: {
    subCategoryData: [],
    loading: false,
    error: null,
    addLoading: false,
    addError: null,
    updateLoading: false,
    updateError: null,
    deleteLoading: false,
    deleteError: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
      state.addError = null;
      state.updateError = null;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch subcategories
      .addCase(fetchSubCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategoryData = action.payload;
      })
      .addCase(fetchSubCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // Add subcategory
      .addCase(addSubCategory.pending, (state) => {
        state.addLoading = true;
        state.addError = null;
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.addLoading = false;
        state.subCategoryData.push(action.payload);
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.addLoading = false;
        state.addError = action.payload || action.error.message;
      })

      // Update subcategory
      .addCase(updateSubCategory.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        state.updateLoading = false;
        const index = state.subCategoryData.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.subCategoryData[index] = action.payload;
        }
      })
      .addCase(updateSubCategory.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload || action.error.message;
      })

      // Delete subcategory
      .addCase(deleteSubCategory.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.subCategoryData = state.subCategoryData.filter(item => item._id !== action.payload);
      })
      .addCase(deleteSubCategory.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload || action.error.message;
      });
  },
});

export const selectAllSubCategory = (state) => state.subCategory.subCategoryData;
export const selectLoading = (state) => state.subCategory.loading;
export const selectError = (state) => state.subCategory.error;

export const selectAddLoading = (state) => state.subCategory.addLoading;
export const selectAddError = (state) => state.subCategory.addError;

export const selectUpdateLoading = (state) => state.subCategory.updateLoading;
export const selectUpdateError = (state) => state.subCategory.updateError;

export const selectDeleteLoading = (state) => state.subCategory.deleteLoading;
export const selectDeleteError = (state) => state.subCategory.deleteError;

export const { clearErrors } = subCategorySlice.actions;

export default subCategorySlice.reducer;

// src/redux/slice/subCategorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../App";

// ✅ Fetch all subcategories (optional category filter)
export const fetchSubCategories = createAsyncThunk(
  "subCategory/fetchSubCategories",
  async (categoryId, { rejectWithValue }) => {
    try {
      let url = `${backendUrl}/api/subcategory/all-subcategories`;
      if (categoryId) {
        url += `?categoryId=${categoryId}`;
      }
      const res = await axios.get(url);
      return res.data.subCategories;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch subcategories");
    }
  }
);

// ✅ Add subcategory
export const addSubCategory = createAsyncThunk(
  "subCategory/addSubCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${backendUrl}/api/subcategory/add`, formData);
      return res.data.subCategory;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to add subcategory");
    }
  }
);

// ✅ Update subcategory
export const updateSubCategory = createAsyncThunk(
  "subCategory/updateSubCategory",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${backendUrl}/api/subcategory/update-subcategory/${id}`, formData);
      return res.data.subCategory;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to update subcategory");
    }
  }
);

// ✅ Delete subcategory
export const deleteSubCategory = createAsyncThunk(
  "subCategory/deleteSubCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${backendUrl}/api/subcategory/delete-subcategory/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete subcategory");
    }
  }
);

const subCategorySlice = createSlice({
  name: "subCategory",
  initialState: {
    subCategoryData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fetch
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
        state.error = action.payload;
      })

      // ✅ Add
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.subCategoryData.unshift(action.payload);
      })

      // ✅ Update
      .addCase(updateSubCategory.fulfilled, (state, action) => {
        const index = state.subCategoryData.findIndex((s) => s._id === action.payload._id);
        if (index !== -1) {
          state.subCategoryData[index] = action.payload;
        }
      })

      // ✅ Delete
      .addCase(deleteSubCategory.fulfilled, (state, action) => {
        state.subCategoryData = state.subCategoryData.filter((s) => s._id !== action.payload);
      });
  },
});

// ✅ Selector
export const selectAllSubCategories = (state) => state.subCategory.subCategoryData;
export const selectSubCategoryLoading = (state) => state.subCategory.loading;
export const selectSubCategoryError = (state) => state.subCategory.error;

export default subCategorySlice.reducer;

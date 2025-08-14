  // src/redux/slice/categorySlice.js
  import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
  import axios from "axios";
  import { backendUrl } from "../../App";

  // ✅ Fetch all categories
  export const fetchCategories = createAsyncThunk(
    "category/fetchCategories",
    async (_, { rejectWithValue }) => {
      try {
        const res = await axios.get(`${backendUrl}/api/category/all-category`);
        return res.data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch categories");
      }
    }
  );

  // ✅ Add category
  export const addCategory = createAsyncThunk(
    "category/addCategory",
    async (formData, { rejectWithValue }) => {
      try {
        const res = await axios.post(`${backendUrl}/api/category/add-category`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data.category;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to add category");
      }
    }
  );

  // ✅ Update category
  export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async ({ id, formData }, { rejectWithValue }) => {
      try {
        const res = await axios.put(`${backendUrl}/api/category/update-category/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return res.data.category;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to update category");
      }
    }
  );

  // ✅ Delete category
  export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id, { rejectWithValue }) => {
      try {
        await axios.delete(`${backendUrl}/api/category/delete-category/${id}`);
        return id;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Failed to delete category");
      }
    }
  );

  const categorySlice = createSlice({
    name: "category",
    initialState: {
      categoryData: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        // ✅ Fetch
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
          state.error = action.payload;
        })

        // ✅ Add
        .addCase(addCategory.fulfilled, (state, action) => {
          state.categoryData.unshift(action.payload);
        })

        // ✅ Update
        .addCase(updateCategory.fulfilled, (state, action) => {
          const index = state.categoryData.findIndex((c) => c._id === action.payload._id);
          if (index !== -1) {
            state.categoryData[index] = action.payload;
          }
        })

        // ✅ Delete
        .addCase(deleteCategory.fulfilled, (state, action) => {
          state.categoryData = state.categoryData.filter((c) => c._id !== action.payload);
        });
    },
  });

  // ✅ Selector
  export const selectAllCategory = (state) => state.category.categoryData;
  export const selectCategoryLoading = (state) => state.category.loading;
  export const selectCategoryError = (state) => state.category.error;

  export default categorySlice.reducer;

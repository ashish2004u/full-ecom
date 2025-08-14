import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backendUrl } from "../../App"; 

const getToken = () => localStorage.getItem("token");
const getAuthHeader = () => {
  const token = getToken();
  return { Authorization: `Bearer ${token}` };
};

// Fetch all users
export const fetchUsers = createAsyncThunk("adminUsers/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${backendUrl}/api/admin/users/all-users`, { headers: getAuthHeader() });
    return res.data.users;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Fetch single user
export const fetchUserById = createAsyncThunk("adminUsers/fetchUserById", async (id, { rejectWithValue }) => {
  try {
    const res = await axios.get(`${backendUrl}/api/admin/users/all-users/${id}`, { headers: getAuthHeader() });
    return res.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Add user
export const addUser = createAsyncThunk("adminUsers/addUser", async (userData, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${backendUrl}/api/admin/users/add-user`, userData, { headers: getAuthHeader() });
    return res.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Update user
export const updateUser = createAsyncThunk("adminUsers/updateUser", async ({ id, userData }, { rejectWithValue }) => {
  try {
    const res = await axios.put(`${backendUrl}/api/admin/users/update-user/${id}`, userData, { headers: getAuthHeader() });
    return res.data.user;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

// Delete user
export const deleteUser = createAsyncThunk("adminUsers/deleteUser", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${backendUrl}/api/admin/users/delete-user/${id}`, { headers: getAuthHeader() });
    return id;
  } catch (error) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});

const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState: {
    users: [],
    selectedUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUsers.fulfilled, (state, action) => { state.loading = false; state.users = action.payload; })
      .addCase(fetchUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Fetch single user
      .addCase(fetchUserById.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchUserById.fulfilled, (state, action) => { state.loading = false; state.selectedUser = action.payload; })
      .addCase(fetchUserById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // Add user
      .addCase(addUser.fulfilled, (state, action) => { state.users.push(action.payload); })

      // Update user
      .addCase(updateUser.fulfilled, (state, action) => {
        const idx = state.users.findIndex((u) => u._id === action.payload._id);
        if (idx !== -1) state.users[idx] = action.payload;
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      });
  },
});

export default adminUserSlice.reducer;

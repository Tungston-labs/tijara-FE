import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser, deleteUserById } from "../services/userServices"; // make sure you have deleteUserById()

// FETCH USER LIST
export const fetchUserList = createAsyncThunk(
  "userlist/fetch",
  async ({ user }, { rejectWithValue }) => {
    try {
      const response = await fetchUser(user);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Unable to fetch user list");
    }
  }
);

// DELETE USER
export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await deleteUserById(userId); // calls your API
      return { userId }; // or response if your API returns more
    } catch (error) {
      return rejectWithValue(error.message || "Unable to delete user");
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    status: "",
    error: ""
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userList = action.payload.data.users;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedId = action.payload.userId;
        state.userList = state.userList.filter(user => user._id !== deletedId);
      });
  },
});

export default UserSlice.reducer;

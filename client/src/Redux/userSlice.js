import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserList = createAsyncThunk(
  "userlist/fetch",
  async ({user}, { rejectWithValue }) => {
    try {
        console.log("here")
      const response = await fetchUsers(user);
     return response;
    } catch (error) {
      return rejectWithValue(error.message || "Unable to fetch user list");
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userList: [5],
    status:"",
    error:""
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userList = action.payload.data.results;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});
export default UserSlice.reducer;

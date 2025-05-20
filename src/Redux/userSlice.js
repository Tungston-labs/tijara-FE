import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUser,
  deleteUserById,
  fetchAgents,
  fetchItems,
  fetchSubItems,
} from "../services/userServices"; // make sure you have deleteUserById()

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

// FETCH AGENT LIST
export const fetchAgentList = createAsyncThunk(
  "agentlist/fetch",
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchAgents({ page }); 
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


// FETCH ITEMS LIST
export const fetchItemList = createAsyncThunk(
  "itemlist/fetch",
  async ({page}, { rejectWithValue }) => {
    try {
      console.log("data")
      const response = await fetchItems({page});
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Unable to fetch user list");
    }
  }
);


// export const fetchAddItemList = createAsyncThunk(
//   "additemlist/fetch",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetchAddItems();
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message || "Unable to fetch user list");
//     }
//   }
// );


export const fetchItemSubList = createAsyncThunk(
  "itemsublist/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchSubItems();
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
export const addAgent=createAsyncThunk(
  "agent/add",
  async(agentData, {rejectWithValue})=>{
    try {
      const response=await addAgent(agentData)
      return response;
    } catch (error) {
      return rejectWithValue(error.message||"Unable to add agents")
    }
  }
)

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    agentList: [],
    status: "",
    error: "",
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
      .addCase(fetchAgentList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAgentList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.agentList = action.payload.agents;
      })

      .addCase(fetchAgentList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch agents";
      })

      .addCase(fetchItemList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.itemtList = action.payload.data.users;
      })
      .addCase(fetchItemList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchItemSubList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemSubList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.itemsubList = action.payload.data.users;
      })
      .addCase(fetchItemSubList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedId = action.payload.userId;
        state.userList = state.userList.filter(
          (user) => user._id !== deletedId
        );
      });

  },
});

export default UserSlice.reducer;

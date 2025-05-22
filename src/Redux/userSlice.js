import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  // fetchUser,
  deleteUserById,
  fetchAgents,
  fetchItems,
  fetchSubItems,
  addAgentAPI,
  editAgentAPI,
  fetchUsersAPI,
} from "../services/userServices"; // make sure you have deleteUserById()

// FETCH USER LIST
// export const fetchUserList = createAsyncThunk(
//   "userlist/fetch",
//   async ({ user }, { rejectWithValue }) => {
//     try {
//       const response = await fetchUser(user);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.message || "Unable to fetch user list");
//     }
//   }
// );

// FETCH AGENT LIST
export const fetchAgentList = createAsyncThunk(
  "agentlist/fetch",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await fetchAgents({ page, limit });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// FETCH ITEMS LIST
export const fetchItemList = createAsyncThunk(
  "itemlist/fetch",
  async ({ page }, { rejectWithValue }) => {
    try {
      console.log("data");
      const response = await fetchItems({ page });
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

// Add Agents
export const addAgent = createAsyncThunk(
  "agent/add",
  async (agentData, { rejectWithValue }) => {
    try {
      const response = await addAgentAPI(agentData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Unable to add agents");
    }
  }
);
export const editAgent = createAsyncThunk(
  "agent/edit",
  async ({ id, editData }, { rejectWithValue }) => {
    try {
      const data = await editAgentAPI(id, editData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to edit agent"
      );
    }
  }
);

export const fetchUserList = createAsyncThunk(
  "user/fetchList",
  async ({ role, search = "", page = 1, status = "" }, { rejectWithValue }) => {
    try {
      const data = await fetchUsersAPI({ role, search, page, status });
      return { role, data }; // include the role in payload
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching users"
      );
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
      sellers : {
    list: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    totalPages: 1,
  },
  buyers: {
    list: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    totalPages: 1,
  },
    agentList: [],
    loading:false,
    status: "",
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(fetchUserList.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchUserList.fulfilled, (state, action) => {
      //   state.status = "succeeded";
      //   state.userList = action.payload.data.users;
      // })
      // .addCase(fetchUserList.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.error = action.error.message;
      // })
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
      .addCase(addAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = "Agent Added Successfully";
        state.agentList.push(action.payload);
      })
      .addCase(addAgent.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(editAgent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editAgent.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;

        const updatedAgent = action.payload.agent;
        const index = state.agentList?.findIndex(
          (a) => a?._id === updatedAgent?._id
        );
        if (index !== -1) {
          state.agentList[index] = updatedAgent;
        }
      })
      .addCase(editAgent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(fetchUserList.pending, (state, action) => {
      const role = action.meta.arg.role;
      if (state[role + "s"]) {
        state[role + "s"].loading = true;
        state[role + "s"].error = null;
      }
    })
 .addCase(fetchUserList.fulfilled, (state, action) => {
  const { role, data } = action.payload;
  const { users, total, page, totalPages } = data;

  state[role + "s"] = {
    ...state[role + "s"],
    list: users,
    total,
    page,
    totalPages,
    loading: false,
    error: null,
  };
})

    .addCase(fetchUserList.rejected, (state, action) => {
      const role = action.meta.arg.role;
      if (state[role + "s"]) {
        state[role + "s"].loading = false;
        state[role + "s"].error = action.payload;
      }
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

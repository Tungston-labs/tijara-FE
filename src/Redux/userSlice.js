import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  // fetchUser,
  deleteUserById,
  fetchAgents,
  fetchItems,
  fetchSubItems,
  fetchUnapprovedUsers,
  fetchProducts,
  addAgentAPI,
  editAgentAPI,
  fetchUsersAPI,
  fetchPendingUsersAPI,
  approveUsersAPI,
  editUserAPI,
  addSubCategoryAPI,
  fetchUserByIdAPI,
  deleteAgentById,
  getSubscriptionHistory,
} from "../services/userServices";

// FETCH AGENT LIST
export const fetchAgentList = createAsyncThunk(
  "agentlist/fetch",
  async ({ page, limit,search }, { rejectWithValue }) => {
    try {
      const response = await fetchAgents({ page, limit,search });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchUnapprovedUserList = createAsyncThunk(
  "unapprovedList/fetch",
  async (page, search,{ rejectWithValue }) => {
    try {
      const response = await fetchUnapprovedUsers({ page ,search});
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
  async ({ page = 1, search = "" }, { rejectWithValue }) => {
    try {
      const response = await fetchSubItems(page, search);
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Unable to fetch item sub list");
    }
  }
);

export const addSubCategory = createAsyncThunk(
  "user/addSubCategory",
  async ({ name, itemNameId }, { rejectWithValue }) => {
    try {
      const data = await addSubCategoryAPI({ name, itemNameId });

      if (!data?.subCategory?._id) {
        return rejectWithValue("Invalid response from server");
      }

      return data.subCategory;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const getUserById = createAsyncThunk(
  "user/getById",
  async ({ role, id }, { rejectWithValue }) => {
    try {
      const data = await fetchUserByIdAPI({ role, id });
      return data; // already data, no .data needed again
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// DELETE USER
export const deleteUser = createAsyncThunk(
  "user/delete",
  async ({ role, id }, { rejectWithValue }) => {
    try {
      await deleteUserById({ role, id });
      return { id, role }; // returning both for reducer filtering if needed
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to delete user"
      );
    }
  }
);

// DELETE USER
export const deleteAgent = createAsyncThunk(
  "agent/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteAgentById(id); // pass only id
      return id; // no need to return role
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Unable to delete agent"
      );
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

export const fetchProductsList = createAsyncThunk(
  "productslist/fetch",
  async ({ page }, { rejectWithValue }) => {
    try {
      console.log("data");
      const response = await fetchProducts({ page });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || "Unable to fetch user list");
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

export const editUser = createAsyncThunk(
  "user/edit",
  async ({ role, id, editData }, { rejectWithValue }) => {
    try {
      const data = await editUserAPI(role, id, editData);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Unable to edit user"
      );
    }
  }
);

export const fetchUserList = createAsyncThunk(
  "user/fetchList",
  async ({ role, search = "", page, status = "" }, { rejectWithValue }) => {
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

export const fetchPendingUsers = createAsyncThunk(
  "users/pendingList",
  async ({ role, search = "", page = 1, status = "" }, { rejectWithValue }) => {
    try {
      const data = await fetchPendingUsersAPI({ role, search, page, status });
      console.log("sfhfsaffbhkajhafghfgjhkfbh", data);
      return { role, data };
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching pending users"
      );
    }
  }
);

export const approveUsers = createAsyncThunk(
  "users/approve",
  async ({ userId, role, status }, { rejectWithValue }) => {
    try {
      const data = await approveUsersAPI({ userId, role, status });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error in approving user"
      );
    }
  }
);

export const fetchSubscriptionHistory = createAsyncThunk(
  "users/fetchSubscriptionHistory",
  async (userId, { rejectWithValue }) => {
    try {
      const data = await getSubscriptionHistory(userId);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subscription history"
      );
    }
  }
);

const UserSlice = createSlice({
  name: "user",
  initialState: {
    sellers: {
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
    editedUser: null,
    agentList: [],
    pending: {
      buyers: [],
      sellers: [],
    },

    itemsubList: {
      list: [],
      page: 1,
      totalPages: 1,
      total: 0,
      loading: false,
      error: null,
    },

    addSubCategoryStatus: "",
    loading: false,
    status: "",
    error: "",
    products: {
      items: [],
      loading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
    },
    name: "user",
    initialState: {
      transactions: [],
      loading: false,
      error: null,
    },
  },

  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setInputValue(state, action) {
      state.inputValue = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

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
        state.itemsubList.loading = true;
        state.itemsubList.error = null;
      })
      .addCase(fetchItemSubList.fulfilled, (state, action) => {
        state.itemsubList.list = action.payload.data; // no `.subCategories`, you already return correct format
        state.itemsubList.page = action.payload.pagination.page;
        state.itemsubList.totalPages = action.payload.pagination.pages;
        state.itemsubList.total = action.payload.pagination.total;
        state.itemsubList.loading = false;
      })
      .addCase(fetchItemSubList.rejected, (state, action) => {
        state.itemsubList.error = action.payload || "Something went wrong";
        state.itemsubList.loading = false;
      })

      .addCase(addSubCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.itemsubList.list.push(action.payload.subCategory);
      })
      .addCase(addSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductsList.pending, (state) => {
        state.products.loading = true;
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.products.loading = false;
        state.products.items = action.payload.data.products;
        state.products.currentPage = action.payload.page;
        state.products.totalPages = action.payload.total;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.products.loading = false;
        state.products.error = action.payload || "Failed to fetch products";
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

      .addCase(fetchPendingUsers.fulfilled, (state, action) => {
        const role = action.meta.arg.role; // "seller" or "buyer"
        const users = action.payload.data.data; // <-- The actual array
        state.pending[`${role}s`] = users;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchPendingUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPendingUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(approveUsers.pending, (state) => {
        state.loading = true;
        state.status = "";
        state.error = "";
      })
      .addCase(approveUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        const { userId, role } = action.meta.arg;

        if (role === "buyer") {
          state.pending.buyers = state.pending.buyers.filter(
            (user) => user._id !== userId
          );
        } else if (role === "seller") {
          state.pending.sellers = state.pending.sellers.filter(
            (user) => user._id !== userId
          );
        }
      })
      .addCase(approveUsers.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || "Failed to approve user.";
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.editedUser = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to edit user";
      })
      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user; // or action.payload depending on API structure
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(fetchSubscriptionHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchSubscriptionHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        const { id, role } = action.payload;
        state.pending[`${role}s`] = state.pending[`${role}s`].filter(
          (user) => user._id !== id
        );
      })

      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const { setSearch, setInputValue } = UserSlice.actions;
export default UserSlice.reducer;

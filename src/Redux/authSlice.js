import { createSlice } from "@reduxjs/toolkit";

// Try to get token from localStorage on app load
const tokenFromStorage = localStorage.getItem("accessToken");

const initialState = {
  userName: null,
  accessToken: tokenFromStorage || null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
login: (state, action) => {
  state.userName = action.payload.userName;
  state.accessToken = action.payload.accessToken;
  state.user = action.payload.user;

  if (action.payload.accessToken) {
    localStorage.setItem("accessToken", action.payload.accessToken);
  }
},

    logout: (state) => {
      state.userName = null;
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken"); 
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setAccessToken, setUser } = authSlice.actions;
export default authSlice.reducer;

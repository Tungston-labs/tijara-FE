// src/services/refreshTokenService.js
import { api } from "../api/api";
import store from "../Redux/store";
import { setAccessToken, logout } from "../Redux/authSlice";

export const refreshToken = async () => {
  try {
    const response = await api.post(
      "/admin/auth/refresh-admin",
      {},
      { withCredentials: true }
    );

    const accessToken = response?.data?.accessToken;
    if (!accessToken) throw new Error("No access token returned");

    store.dispatch(setAccessToken({ accessToken }));
    localStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    console.log("Refresh token failed:", error?.response?.data || error);
    store.dispatch(logout());
    localStorage.removeItem("accessToken");
    return null;
  }
};

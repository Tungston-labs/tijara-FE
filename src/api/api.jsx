// src/api.jsx
import axios from "axios";
import store from "../Redux/store"
import { setAccessToken } from "../Redux/authSlice";
import useRefreshToken from "../Hooks/useRefreshToken";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Public API instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Private API instance (for authenticated requests)
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request Interceptor
axiosPrivate.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error?.response?.status === 401 || error?.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await useRefreshToken();
        if (!newAccessToken) return Promise.reject(error);

        // Update Redux state + axios headers
        store.dispatch(setAccessToken({ accessToken: newAccessToken }));
        axiosPrivate.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosPrivate(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export { api, axiosPrivate };

// src/api/api.jsx
import axios from "axios";
import store from "../Redux/store";
import { setAccessToken, logout } from "../Redux/authSlice";

const BASE_URL = import.meta.env.VITE_BACKEND_URL?.trim() || "https://api.thijara.me";

// Public API instance (no auth header, used for refresh/login/etc)
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Private API instance (for authenticated requests)
// NOTE: do NOT import service files into this module to avoid circular imports
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor: attach latest token from Redux
axiosPrivate.interceptors.request.use(
  (config) => {
    try {
      const token = store.getState().auth.accessToken;
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {
      // swallow
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: refresh on 401/403 using the public `api` (no circular import)
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;

    // Only try once per request
    if (!originalRequest || originalRequest._retry) return Promise.reject(error);

    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint using public api so we don't re-enter this interceptor
        const refreshResponse = await api.post(
          "/admin/auth/refresh", // <- ensure this matches your backend route
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse?.data?.accessToken;
        if (!newAccessToken) {
          // couldn't refresh
          store.dispatch(logout());
          localStorage.removeItem("accessToken");
          return Promise.reject(error);
        }

        // Update Redux + localStorage
        store.dispatch(setAccessToken({ accessToken: newAccessToken }));
        localStorage.setItem("accessToken", newAccessToken);

        // Set header for retried request
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Also update axiosPrivate default for subsequent requests
        axiosPrivate.defaults.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosPrivate(originalRequest);
      } catch (refreshErr) {
        // Refresh failed; force logout
        try {
          store.dispatch(logout());
        } catch (e) {ss}
        localStorage.removeItem("accessToken");
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// Public API instance (no authentication required)
const api = axios.create({
  baseURL: BASE_URL,
});

// Private API instance (for authenticated requests)
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
export const refreshToken = async () => {
  const response = await axios.post(
    `${BASE_URL}/admin/auth/refresh-admin`, 
    {},
    { withCredentials: true }
  );
  return response.data.accessToken;
};
export { api, axiosPrivate };

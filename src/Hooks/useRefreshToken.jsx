import { useDispatch } from "react-redux";
import { setAccessToken, logout } from "../Redux/authSlice";
import { api } from "../api/api"; // Your axios instance

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      const response = await api.get(
        "/admin/auth/refresh",
        {},
        {
          withCredentials: true, 
        }
      );

      const accessToken = response?.data?.accessToken;

      if (!accessToken) throw new Error("No access token returned");

      dispatch(setAccessToken({ accessToken }));
      localStorage.setItem("accessToken", accessToken);

      return accessToken;
    } catch (error) {
      console.log("Refresh token failed:", error?.response?.data || error);
      dispatch(logout());
      localStorage.removeItem("accessToken");
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;

import { useDispatch } from "react-redux";
import { setAccessToken, logout } from "../Redux/authSlice";
import { api } from "../api/api";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    try {
      // Try reading role from localStorage (fallback if Redux is empty)
      let role = localStorage.getItem("role");

      if (!role) throw new Error("User role not found for refresh.");

      let refreshUrl = "";
      if (role === "admin") refreshUrl = "/admin/auth/refresh";
      else if (role === "seller") refreshUrl = "/seller/refresh";
      else if (role === "buyer") refreshUrl = "/buyer/refresh";
      else throw new Error("Unknown role");

      const response = await api.post(
        refreshUrl,
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(
        setAccessToken({
          accessToken: response.data.accessToken,
        })
      );

      return response.data.accessToken;
    } catch (error) {
      console.log("Refresh token failed:", error?.response?.data || error);
      dispatch(logout()); // clear state if refresh fails
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;

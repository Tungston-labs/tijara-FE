import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "../Redux/authSlice";
import { api } from "../api/api";
// import useLogout from "./useLogout";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth?.role); // get role from Redux

  const refresh = async () => {
    try {
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
      // await logOut();
      return null;
    }
  };

  return refresh;
};

export default useRefreshToken;
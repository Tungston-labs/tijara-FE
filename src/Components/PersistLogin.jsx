// components/PersistLogin.js
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "../services/useRefreshTokenService"; // service
import { setAccessToken } from "../Redux/authSlice";
import { axiosPrivate } from "../api/api";

const PersistLogin = ({ children }) => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      // Only call refresh if no token
      if (!accessToken) {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          dispatch(setAccessToken({ accessToken: newAccessToken }));
          axiosPrivate.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
        }
      }
      setIsLoading(false);
    };
    checkToken();
  }, [accessToken, dispatch]);

  if (isLoading) return <p>Loading...</p>;
  return children;
};


export default PersistLogin;

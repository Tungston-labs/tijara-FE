// components/PersistLogin.js
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useRefreshToken from "../Hooks/useRefreshToken";
import { setAccessToken } from "../Redux/authSlice";

const PersistLogin = () => {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refresh = useRefreshToken();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      if (!accessToken) {
        const newAccessToken = await refresh();
        if (newAccessToken) {
          dispatch(setAccessToken({ accessToken: newAccessToken }));
          localStorage.setItem("accessToken",newAccessToken)
        }
      }
      setIsLoading(false);
    };

    verifyRefreshToken();
  }, [accessToken, dispatch, refresh]);

  if (isLoading) return <p>Loading...</p>;

  return <Outlet />;
};

export default PersistLogin;

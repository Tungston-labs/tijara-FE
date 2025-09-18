import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/api.jsx"; 
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/authSlice.js";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logotijara.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      navigate("/box");
    }
  }, [accessToken]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosPrivate.post(
        "https://api.thijara.me/admin/auth/adminlogin",
        formData,
        { withCredentials: true }
      );

      const { user, accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", user.role);

      dispatch(
        login({
          userName: user.userName,
          accessToken,
          user,
        })
      );

      axiosPrivate.defaults.headers.Authorization = `Bearer ${accessToken}`;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center  flex items-center 4xl:w justify-center font-[Nunito]"
      style={{ backgroundImage: "url('Frame 712.png')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="  w-full 
    sm:w-80
    md:w-96
    lg:w-[400px]
    xl:w-[400px]
    2xl:w-[400px]
    4xl:w-[700px]
    5xl:w-[800px]
    bg-white rounded-2xl p-10
   shadow-[0_0_20px_rgba(0,0,0,0.1)]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="tijara logo" className="h-12 object-contain 2xl:w-50 2xl:h-12 4xl:w-100 5xl:w-100 5xl:h-20  4xl:h-20  " />
        </div>

        <p className="text-center text-gray-600 mb-8 4xl:text-3xl 5xl:text-4xl text-sm">
          Log in to manage your fresh
          <br />
          produce effortlessly
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-black 4xl:text-3xl 5xl:text-4xl  font-bold mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 4xl:text-3xl 5xl:text-4xl bg-gray-100 rounded-md outline-none"
          />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-black font-bold 4xl:text-3xl 5xl:text-4xl">Password</label>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-100 4xl:text-3xl 5xl:text-4xl rounded-md outline-none"
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
        <div className="flex justify-end items-center align-middle mb-1 ">
          <span
            onClick={() => navigate("/email")}
            className="text-[#B3DB48] text-sm 4xl:text-3xl 5xl:text-4xl justify-end hover:underline  cursor-pointer"
          >
            Forgot password?
          </span>
        </div>
        {/* Remember Me */}
        <div className="flex items-center  mb-6">
          <input type="checkbox" id="remember" className="mr-2 w-5 h-5           /* default size */
      4xl:w-6 4xl:h-6   /* 4xl screens */
      5xl:w-8 5xl:h-8 " />
          <label htmlFor="remember" className="text-sm 4xl:text-3xl 5xl:text-4xl text-black">
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#B3DB48] text-white 4xl:py-4  py-2 4xl:text-3xl 5xl:text-4xl rounded-md font-bold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

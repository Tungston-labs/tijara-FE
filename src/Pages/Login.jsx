import { useEffect, useState } from "react";
import axios from "axios";
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
      const response = await axios.post(
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
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center font-[Nunito]"
      style={{ backgroundImage: "url('Frame 712.png')" }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl p-10 w-full max-w-sm shadow-[0_0_20px_rgba(0,0,0,0.1)]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="tijara logo" className="h-12 object-contain" />
        </div>

        <p className="text-center text-gray-600 mb-8 text-sm">
          Log in to manage your fresh
          <br />
          produce effortlessly
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-black font-bold mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
          />
        </div>

        {/* Password */}
        {/* Password */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-black font-bold">Password</label>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
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
            className="text-[#B3DB48] text-sm justify-end hover:underline  cursor-pointer"
          >
            Forgot password?
          </span>
        </div>
        {/* Remember Me */}
        <div className="flex items-center mb-6">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember" className="text-sm text-black">
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#B3DB48] text-white py-2 rounded-md font-bold"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

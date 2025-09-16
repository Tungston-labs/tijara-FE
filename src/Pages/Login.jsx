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
        className="bg-white rounded-2xl p-10 w-full md:w-2xl lg:w-xl lg:h-full md:h-full max-w-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]"
      >
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo} alt="tijara logo" className="h-12 object-contain" />
        </div>

        <p className="text-center text-gray-600 mb-8 text-sm md:text-2xl lg:text-3xl">
          Log in to manage your fresh<br />produce effortlessly
        </p>

        {/* Email */}
        <div className="mb-4 md:text-2xl lg:text-3xl">
          <label className="block text-black md:text-2xl lg:text:3xl font-bold mb-1">
            Email
          </label>
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

        {/* Password with Eye Icon */}
        <div className="mb-4 relative">
          <label className="text-black font-bold md:text-2xl lg:text-3xl">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"} 
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-100 rounded-md md:text-2xl lg:text-3xl outline-none pr-10"
          />
          {/* Eye Icon Button */}
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-10 cursor-pointer text-gray-500"
          >
            {showPassword ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
          </span>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Forgot password */}
        <div className="flex justify-end items-center align-middle mb-1 ">
          <span
            onClick={() => navigate("/email")}
            className="text-[#B3DB48] text-sm justify-end hover:underline md:text-2xl lg:text-3xl cursor-pointer"
          >
            Forgot password
          </span>
        </div>

        {/* Remember Me */}
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="remember"
            className="mr-2 md:text-2xl lg:text-3xl"
          />
          <label
            htmlFor="remember"
            className="text-sm text-black md:text-2xl lg:text-3xl"
          >
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#B3DB48] text-white py-2 rounded-md font-bold md:text-2xl lg:text-3xl"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

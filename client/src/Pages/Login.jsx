import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const response = await axios.post("http://localhost:5000/admin/auth/adminlogin", formData, {
        withCredentials: true, // for sending cookies
      });

      const { accessToken, username, role } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("username", username);
      localStorage.setItem("role", role);

      // Redirect to dashboard or home
      window.location.href = "/box";
    } catch (err) {
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
          <img src="/image 6.png" alt="tijara logo" className="h-12 object-contain" />
        </div>

        <p className="text-center text-gray-600 mb-8 text-sm">
          Log in to manage your fresh<br />produce effortlessly
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
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-black font-bold">Password</label>
            <a href="#" className="text-[#B3DB48] text-sm hover:underline">
              Forgot password
            </a>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-100 rounded-md outline-none"
          />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

        {/* Remember Me */}
        <div className="flex items-center mb-6">
          <input type="checkbox" id="remember" className="mr-2" />
          <label htmlFor="remember" className="text-sm text-black">Remember me</label>
        </div>

        {/* Login Button */}
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

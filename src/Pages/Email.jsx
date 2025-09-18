import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0); // 60s timer
  const navigate = useNavigate();

  const role = "admin";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || cooldown > 0) return; // prevent spamming

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "https://api.thijara.me/admin/auth/send-otp",
        { email, role },
        { withCredentials: true }
      );

      localStorage.setItem("resetToken", response.data.resetToken);

      navigate("/otp", { state: { email, role } });

      setCooldown(60);
    } catch (err) {
      console.error("Error:", err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Server error");
      }
    } finally {
      setLoading(false);
    }
  };

  // decrease cooldown every second
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 4xl:p-16 5xl:p-16 rounded-3xl w-full max-w-sm 4xl:max-w-xl shadow-[0_0_20px_rgba(0,0,0,0.1)]">
        <form onSubmit={handleSubmit}>
          <label className="block text-black 4xl:text-3xl 5xl:text-4xl text-lg font-[Nunito] font-bold mb-2">
            Enter Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 4xl:p-6 5xl:p-6 4xl:text-3xl 5xl:text-4xl bg-[#ECECEC] text-gray-600 font-[Nunito] rounded-2xl mb-6 focus:outline-none focus:ring-2"
          />

          {error && (
            <p className="text-red-500 text-sm mb-4 font-[Nunito]">{error}</p>
          )}

          {/* Button / Timer */}
          <button
            type="submit"
            disabled={loading || cooldown > 0}
            className={`w-full 4xl:p-6 5xl:p-6 py-4 4xl:text-3xl 5xl:text-4xl  rounded-2xl text-lg font-[Nunito] font-bold transition-colors ${
              loading || cooldown > 0
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#B3DB48] text-white"
            }`}
          >
            {loading
              ? "Sending..."
              : cooldown > 0
              ? `Resend OTP in ${cooldown}s`
              : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

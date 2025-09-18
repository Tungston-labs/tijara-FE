import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "@fontsource/nunito";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isValid =
      newPassword.length > 0 &&
      confirmPassword.length > 0 &&
      newPassword === confirmPassword;
    setIsButtonDisabled(!isValid);
  }, [newPassword, confirmPassword]);

  const handleReset = async () => {
    try {
      setError("");
      setMessage("");
      const token = localStorage.getItem("resetToken");

      const response = await fetch(
        "https://api.thijara.me/admin/auth/admin-reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          credentials: "include",
          body: JSON.stringify({ newPassword }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage(data.message);
      setNewPassword("");
      setConfirmPassword("");

      // Navigate after short delay so user can see success message
      setTimeout(() => {
        navigate("/login"); // adjust route if needed
      }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white rounded-2xl p-10 4xl:p-16 5xl:p-16 w-full max-w-md 4xl:max-w-2xl 5xl:max-w-2xl shadow-[0_0_20px_rgba(0,0,0,0.2)]">
        <h2 className="text-2xl text-center 4xl:text-3xl 5xl:text-4xl text-black mb-8 font-[Nunito] font-bold">
          Reset your password
        </h2>

        {message && (
          <div className="mb-4 text-green-600 text-center font-semibold">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-600 text-center font-semibold">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-black 4xl:text-3xl 5xl:text-4xl font-[Nunito] font-bold mb-1">
              New password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full px-4 py-3 4xl:px-8 4xl:py-6 4xl:text-3xl 5xl:text-4xl  5xl:px-8 5xl:py-6 border rounded-md pr-10 focus:outline-none focus:ring-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-[#B3DB48]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-black  4xl:text-3xl 5xl:text-4xl font-[Nunito] font-bold mb-1">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full px-4 5xl:px-8 5xl:py-6 4xl:px-8 4xl:py-6 4xl:text-3xl 5xl:text-4xl py-3 border rounded-md pr-10 focus:outline-none focus:ring-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-[#B3DB48]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <button
            onClick={handleReset}
            className={`w-full py-3 mt-4 text-white 4xl:py-6 5xl:py-6 4xl:text-3xl 5xl:text-4xl font-[Nunito] font-bold rounded-md transition ${
              isButtonDisabled
                ? "bg-[#CEDEA5] cursor-not-allowed"
                : "bg-[#B3DB48]"
            }`}
            disabled={isButtonDisabled}
          >
            Reset password
          </button>
        </div>
      </div>
    </div>
  );
}

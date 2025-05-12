import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import "@fontsource/nunito"; // Ensure you've run: npm install @fontsource/nunito

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const isValid =
      newPassword.length > 0 &&
      confirmPassword.length > 0 &&
      newPassword === confirmPassword;
    setIsButtonDisabled(!isValid);
  }, [newPassword, confirmPassword]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-[0_0_20px_rgba(0,0,0,0.2)]">
        <h2 className="text-2xl text-center text-black mb-8 font-[Nunito] font-bold">
          Reset your password
        </h2>

        <div className="space-y-6">
          {/* New Password */}
          <div>
            <label className="block text-black font-[Nunito] font-bold mb-1">
              New password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                className="w-full px-4 py-3 border rounded-md pr-10 focus:outline-none focus:ring-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-black font-[Nunito] font-bold mb-1">
              Confirm new password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full px-4 py-3 border rounded-md pr-10 focus:outline-none focus:ring-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-[#B3DB48]"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {/* No eye icon for confirm field */}
            </div>
          </div>

          {/* Reset Button */}
          <button
            className={`w-full py-3 mt-4 text-white font-[Nunito] font-bold rounded-md transition ${
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

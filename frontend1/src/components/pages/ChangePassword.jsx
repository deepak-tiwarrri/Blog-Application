import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userApi } from "@/api";
import { toast } from "sonner";
import { useScrollToTop } from "@/hooks/useScrollToTop.js";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, CheckCircle } from "lucide-react";

const ChangePassword = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [loading, setLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");

  if (!userId) {
    navigate("/login");
    return null;
  }

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.length >= 8) strength += 20;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 15;
    return Math.min(strength, 100);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "newPassword") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength < 40) return "bg-red-500";
    if (passwordStrength < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength < 40) return "Weak";
    if (passwordStrength < 70) return "Fair";
    return "Strong";
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("All password fields are required");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      toast.error("New password must be different from current password");
      return;
    }

    try {
      setLoading(true);
      await userApi.changePassword(userId, passwordData);

      setSuccessMessage("Password changed successfully! Redirecting...");
      toast.success("Password changed successfully!");

      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Failed to change password:", error);
      toast.error(
        error?.response?.data?.message || "Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-blue-300 hover:text-blue-200 mb-8 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Back to Profile
        </button>

        <div className="bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 hover:border-white/30 transition-all duration-300">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
              <Lock size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Change Password</h1>
              <p className="text-sm text-gray-300 mt-1">
                Update your account security
              </p>
            </div>
          </div>

          {successMessage ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4 backdrop-blur-md border border-green-400/30">
                <CheckCircle size={32} className="text-green-300" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">
                Password Updated!
              </h2>
              <p className="text-gray-300 mb-4">{successMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div>
                <Label
                  htmlFor="currentPassword"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  Current Password
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your current password"
                    className="w-full pr-10 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-blue-400/50 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        current: !prev.current,
                      }))
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {showPasswords.current ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="newPassword"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  New Password
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={handleInputChange}
                    placeholder="Enter your new password"
                    className="w-full pr-10 bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 rounded-xl focus:border-blue-400/50 focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        new: !prev.new,
                      }))
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {showPasswords.new ? "Hide" : "Show"}
                  </button>
                </div>

                {passwordData.newPassword && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-gray-400">
                        Password Strength
                      </span>
                      <span
                        className={`text-xs font-bold ${
                          passwordStrength < 40
                            ? "text-red-400"
                            : passwordStrength < 70
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden border border-white/5">
                      <div
                        className={`h-full ${getStrengthColor()} transition-all duration-300`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-3 p-3 bg-blue-500/10 backdrop-blur-md rounded-xl border border-blue-400/20">
                  <p className="text-xs font-medium text-gray-300 mb-2">
                    Password must contain:
                  </p>
                  <ul className="space-y-1 text-xs text-gray-400">
                    <li
                      className={
                        passwordData.newPassword.length >= 6
                          ? "text-green-400"
                          : ""
                      }
                    >
                      ✓ At least 6 characters
                    </li>
                    <li
                      className={
                        /[a-z]/.test(passwordData.newPassword)
                          ? "text-green-400"
                          : ""
                      }
                    >
                      ✓ Lowercase letters (a-z)
                    </li>
                    <li
                      className={
                        /[A-Z]/.test(passwordData.newPassword)
                          ? "text-green-400"
                          : ""
                      }
                    >
                      ✓ Uppercase letters (A-Z)
                    </li>
                    <li
                      className={
                        /[0-9]/.test(passwordData.newPassword)
                          ? "text-green-400"
                          : ""
                      }
                    >
                      ✓ Numbers (0-9)
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <Label
                  htmlFor="confirmPassword"
                  className="block text-sm font-semibold text-gray-200 mb-2"
                >
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your new password"
                    className={`w-full pr-10 bg-white/10 backdrop-blur-md border text-white placeholder-gray-400 rounded-xl focus:outline-none transition-all ${
                      passwordData.confirmPassword &&
                      passwordData.newPassword !== passwordData.confirmPassword
                        ? "border-red-400/50 focus:border-red-400/70"
                        : "border-white/20 focus:border-blue-400/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPasswords((prev) => ({
                        ...prev,
                        confirm: !prev.confirm,
                      }))
                    }
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    {showPasswords.confirm ? "Hide" : "Show"}
                  </button>
                </div>
                {passwordData.confirmPassword &&
                  passwordData.newPassword !== passwordData.confirmPassword && (
                    <p className="text-xs text-red-400 mt-1">
                      Passwords do not match
                    </p>
                  )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500/40 hover:bg-blue-500/60 text-white py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-md border border-blue-400/30 hover:border-blue-400/50"
              >
                {loading ? "Changing Password..." : "Change Password"}
              </Button>

              <Button
                type="button"
                onClick={() => navigate("/profile")}
                disabled={loading}
                className="w-full bg-gray-400/20 hover:bg-gray-400/30 text-white py-3 rounded-xl font-semibold transition-all duration-300 backdrop-blur-md border border-gray-300/20 hover:border-gray-300/40"
              >
                Cancel
              </Button>
            </form>
          )}
        </div>

        <div className="mt-8 bg-blue-500/10 backdrop-blur-md rounded-2xl p-4 border border-blue-400/20">
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-blue-300">💡 Tip:</span> Use a
            mix of uppercase, lowercase, numbers, and special characters for a
            stronger password.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;

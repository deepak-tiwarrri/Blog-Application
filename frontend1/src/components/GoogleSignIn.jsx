import { useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_URL } from "@/lib/endpoints";
import { setAuthToken } from "@/api";
import { setTokenWithTimestamp } from "@/hooks/useTokenExpiration";
import { GoogleButton } from "./common/GoogleButton";

/**
 * GoogleSignInButton Component
 * Handles Google OAuth authentication with custom styled button
 */
const GoogleSignInButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  // Don't show Google signin if already logged in
  if (isLoggedIn) {
    return null;
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Send token to backend for verification using configured USER_URL
      const response = await axios.post(`${USER_URL}/google-signin`, {
        token: credentialResponse.credential,
      });
      console.log("res from google success: ", response.data);

      const { data } = response.data;
      const { user, accessToken } = data;

      // Store token in localStorage and set axios auth header
      localStorage.setItem("token", accessToken);
      localStorage.setItem("userId", user._id);
      setAuthToken(accessToken);
      setTokenWithTimestamp(accessToken);

      // Update Redux state
      dispatch(authActions.login());
      dispatch(
        authActions.updateUser({
          name: user.name,
          email: user.email,
          profilePicture: user.profilePicture,
          _id: user._id,
        }),
      );

      toast.success(response?.message);
      navigate("/blogs");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error(error.response?.data?.message || "Google Sign-In failed");
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In failed. Please try again.");
  };

  useEffect(() => {
    if (!googleClientId) {
      console.warn("Google Client ID is not configured");
    }
  }, [googleClientId]);

  if (!googleClientId) {
    return (
      <button
        disabled
        className="w-full py-3 px-6 border-2 border-gray-300 bg-gray-800/10 text-gray-500 rounded-lg font-semibold flex items-center justify-center gap-3 cursor-not-allowed"
      >
        Google Sign-In Unavailable
      </button>
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="w-full flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
          theme="outline"
          size="large"
          shape="rectangular"
          text="signin_with"
          width="100%"
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignInButton;

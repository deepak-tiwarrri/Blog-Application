import { useEffect, useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_URL } from "@/lib/endpoints";
import { setAuthToken } from "@/api";
import { setTokenWithTimestamp } from "@/hooks/useTokenExpiration";

/**
 * Custom Google Button component utilizing useGoogleLogin hook.
 * Directly attached to an onClick user gesture to bypass browser popup blockers completely.
 */
const CustomGoogleButton = ({ onAuthSuccess }) => {
  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      try {
        await onAuthSuccess(tokenResponse.access_token);
      } finally {
        setLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.error("Google Sign-In Error:", errorResponse);
      toast.error("Google Sign-In was cancelled or failed");
    },
  });

  return (
    <button
      type="button"
      onClick={() => login()}
      disabled={loading}
      className="w-full py-3.5 px-6 bg-white/10 hover:bg-white/15 border border-white/20 active:scale-[0.98] transition-all duration-200 rounded-xl font-semibold text-white flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:cursor-pointer disabled:opacity-50"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
      )}
      <span>{loading ? "Signing in..." : "Continue with Google"}</span>
    </button>
  );
};

/**
 * GoogleSignInButton Component
 * Handles Google OAuth authentication with custom styled button
 */
const GoogleSignInButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth?.isLoggedIn);
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;


  useEffect(() => {
    if (!googleClientId) {
      console.warn("Google Client ID is not configured");
    }
  }, [googleClientId]);


  const handleGoogleSuccess = async (token) => {
    try {
      const response = await axios.post(`${USER_URL}/google-signin`, { token });
      console.log("res from google success: ", response.data);

      const { data } = response.data;
      const { user, accessToken } = data;
      console.log("user id: ",user._id);
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
        })
      );

      toast.success(response?.data?.message || "Signed in with Google successfully!");
      navigate("/blogs");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error(error.response?.data?.message || "Google Sign-In failed");
    }
  };


   

  if (!googleClientId) {
    return (
      <button
        disabled
        className="w-full py-3.5 px-6 border border-white/10 bg-white/5 text-gray-400 rounded-xl font-semibold flex items-center justify-center gap-3 cursor-not-allowed"
      >
        Google Sign-In Unavailable
      </button>
    );
  }
  if (isLoggedIn) {
    return null;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <CustomGoogleButton onAuthSuccess={handleGoogleSuccess} />
    </GoogleOAuthProvider>
  );
};

export default GoogleSignInButton;

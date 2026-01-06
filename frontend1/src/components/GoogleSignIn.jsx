import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { authActions } from "@/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_URL } from "@/lib/endpoints";
import GoogleIcon from "../../public/assets/google-icon.svg?url";
import { GoogleButton } from "./common/GoogleButton";

/**
 * GoogleSignInButton Component
 * Handles Google OAuth authentication with custom styled button
 */
const GoogleSignInButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Send token to backend for verification using configured USER_URL
      const response = await axios.post(`${USER_URL}/google-signin`, {
        token: credentialResponse.credential,
      });
      console.log("res from google success: ", response.data);

      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user._id);

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

      toast.success("Google Sign-In Successful!");
      navigate("/blogs");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error(error.response?.data?.message || "Google Sign-In failed");
    }
  };
  const handleClick = () => {
    // Trigger the actual GoogleLogin component
    const googleLoginButton = document.querySelector('[role="button"]');
    if (googleLoginButton) googleLoginButton.click();
  };

  const handleGoogleError = () => {
    toast.error("Google Sign-In failed. Please try again.");
  };

  // Custom styled Google Sign-In button
  <GoogleButton>Sign in with Google</GoogleButton>;

  if (!googleClientId) {
    console.warn("Google Client ID is not configured");
    return toast.error(
      "Google Sign-In is not available at the moment, add google client id"
    );
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div style={{ position: "relative" }}>
        {/* Hidden GoogleLogin component - we'll use custom button above */}
        <div
          style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
        >
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            text="signin_with"
            size="large"
          />
        </div>
        {/* Custom styled button */}
        <GoogleButton />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleSignInButton;

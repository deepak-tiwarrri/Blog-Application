import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setAuthToken } from "@/api";
import { setTokenWithTimestamp } from "@/hooks/useTokenExpiration";
import { authActions } from "@/store";
import { useDispatch } from "react-redux";
import { USER_URL } from "@/lib/endpoints";

const GoogleCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      toast.error("Google sign-in failed: " + error);
      navigate("/login");
      return;
    }

    if (!code) {
      toast.error("Google sign-in code not found");
      navigate("/login");
      return;
    }

    const exchangeCode = async () => {
      try {
        const response = await axios.post(`${USER_URL}/google-signin/${encodeURIComponent(code)}`);
        const { data, message } = response.data;
        const { user, accessToken } = data;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("userId", user._id);
        setAuthToken(accessToken);
        setTokenWithTimestamp(accessToken);

        dispatch(authActions.login());
        dispatch(
          authActions.updateUser({
            name: user.name,
            email: user.email,
            profilePicture: user.profilePicture,
            _id: user._id,
          })
        );

        toast.success(message || "Signed in with Google successfully!");
        navigate("/blogs");
      } catch (err) {
        console.error("Google callback exchange failed:", err);
        toast.error(err.response?.data?.message || "Google sign-in failed");
        navigate("/login");
      }
    };

    exchangeCode();
  }, [navigate, searchParams, dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-white">Signing you in...</h2>
        <p className="mt-4 text-gray-300">Please wait while we finish your Google sign-in.</p>
      </div>
    </div>
  );
};

export default GoogleCallback;

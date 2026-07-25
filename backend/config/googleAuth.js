// Google OAuth Configuration
// Install: npm install google-auth-library
import { OAuth2Client } from "google-auth-library";

const googleClient = process.env.GOOGLE_CLIENT_ID
  ? new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
  : null;

/**
 * Verify Google ID Token and extract user info
 * @param {string} token - Google ID token from frontend
 * @returns {Object} Decoded token with user info
 */
export const verifyGoogleToken = async (token) => {
  if (!process.env.GOOGLE_CLIENT_ID || !googleClient) {
    throw new Error("Google OAuth is not configured on the server. Set GOOGLE_CLIENT_ID in the backend environment.");
  }

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    console.log("google ticket response: ", ticket);
    const payload = ticket.getPayload();

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      googleId: payload.sub,
    };
  } catch (error) {
    console.warn("Google ID token verification failed, trying UserInfo API fallback:", error.message);
    try {
      const userinfoRes = await googleClient.request({
        url: "https://www.googleapis.com/oauth2/v3/userinfo",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (userinfoRes && userinfoRes.data) {
        const payload = userinfoRes.data;
        return {
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
          googleId: payload.sub,
        };
      }
    } catch (fallbackError) {
      console.error("Google userinfo fallback failed:", fallbackError.message);
    }
    throw new Error("Invalid Google token");
  }
};

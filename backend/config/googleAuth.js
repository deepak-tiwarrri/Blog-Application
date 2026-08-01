// Google OAuth Configuration
// Install: npm install google-auth-library
import { OAuth2Client } from "google-auth-library";
import { InvalidCredentialsError } from "../utils/AppError.js";

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
      // Plain fetch (not googleClient.request) because OAuth2Client.request()
      // always tries to attach its own credentials before sending, and this
      // client only holds a client ID (no credentials) - it would throw
      // "No access, refresh token, API key or refresh handler callback is set"
      // before ever using the manual Authorization header below.
      const userinfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (userinfoRes.ok) {
        const payload = await userinfoRes.json();
        return {
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
          googleId: payload.sub,
        };
      }
      console.error("Google userinfo fallback failed:", userinfoRes.status, await userinfoRes.text());
    } catch (fallbackError) {
      console.error("Google userinfo fallback failed:", fallbackError.message);
    }
    throw new InvalidCredentialsError("Invalid or expired Google token");
  }
};

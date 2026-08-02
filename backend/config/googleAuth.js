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

export const exchangeCodeForGoogleUser = async (code, redirectUri) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Google OAuth is not configured on the server. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in the backend environment.");
  }

  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    redirectUri
  );

  try {
    const { tokens } = await client.getToken(code);
    if (!tokens?.id_token) {
      throw new InvalidCredentialsError("Failed to obtain Google ID token from authorization code");
    }

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      throw new InvalidCredentialsError("Invalid Google token payload");
    }

    return {
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
      googleId: payload.sub,
    };
  } catch (error) {
    console.error("Google code exchange failed:", error.message || error);
    throw new InvalidCredentialsError("Google authorization code exchange failed");
  }
};

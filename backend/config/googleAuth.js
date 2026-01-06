// Google OAuth Configuration
// Install: npm install google-auth-library
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verify Google ID Token and extract user info
 * @param {string} token - Google ID token from frontend
 * @returns {Object} Decoded token with user info
 */
export const verifyGoogleToken = async (token) => {
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
    console.error("Google token verification failed:", error.message);
    throw new Error("Invalid Google token");
  }
};

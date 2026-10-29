import { OAuth2Client } from "google-auth-library";
import { env } from "../config/env";
import { AppError } from "../errors/AppError";

export type GoogleUserProfile = {
  googleId: string;
  email: string;
};

const googleOauthClient = new OAuth2Client(
  env.googleClientId,
  env.googleClientSecret,
  env.googleRedirectUrl,
);

export function getGoogleAuthUrl(): string {
  return googleOauthClient.generateAuthUrl({
    scope: ["openid", "email", "profile"],
    access_type: "online",
    prompt: "select_account",
  });
}

export async function getGoogleUserFromAuthCode(
  code: string,
): Promise<GoogleUserProfile> {
  // 1. checks code present or not
  if (!code) {
    throw new AppError(400, "Google auth code is required");
  }

  // 2. if it's present then get the token using this method
  const { tokens } = await googleOauthClient.getToken(code);

  //  3. checks the id_token present or not
  if (!tokens.id_token) {
    throw new AppError(401, "Google login failed: id_token missing");
  }

  // 4. if it's present verify the token
  // User info recieved from google
  const ticketInfo = await googleOauthClient.verifyIdToken({
    idToken: tokens.id_token,
    audience: env.googleClientId,
  });

  // 5. get the payload
  const payload = ticketInfo.getPayload();

  // 6. checks the payload present or not
  if (!payload?.sub || !payload.email) {
    throw new AppError(401, "Google login failed: Invalid user profile");
  }

  // 7. then return the googleId & email
  return {
    googleId: payload.sub,
    email: payload.email.toLowerCase().trim(),
  };
}

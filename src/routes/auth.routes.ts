import { Router } from "express";
import {
  loginUser,
  loginWithGoogle,
  registerUser,
  startGoogleLogin,
} from "../services/auth.services";
import { AppError } from "../errors/AppError";
import { authenticate } from "../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // not writing service login here
    // service login -> service file
    await registerUser(email, password);

    res.status(201).json({
      success: true,
      message: "Registration successfull. Please login to continue",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { accessToken } = await loginUser(email, password);

    res.status(200).json({
      success: true,
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
});

// get my current user info
// protect your routes

authRouter.get("/me", authenticate, (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: req.user,
    },
  });
});

// /api/auth/google
// google consent screen - this what helps the user to login through google account directly or registeer through it

authRouter.get("/google", (_req, res) => {
  const googleAuthUrl = startGoogleLogin();

  res.redirect(googleAuthUrl);
});

authRouter.get("/google/callback", async (req, res, next) => {
  try {
    const code = req.query.code as string | undefined;

    const { accessToken } = await loginWithGoogle(code ?? "");

    res.status(200).json({
      success: true,
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
});

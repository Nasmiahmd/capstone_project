import { Router } from "express";
import { loginUser, registerUser } from "../services/auth.services";
import { AppError } from "../errors/AppError";
import { authenticate } from "../middleware/auth.middleware";

export const authRouter = Router();

authRouter.post("/register", async(req, res, next) => {
    try {
        const { email, password } = req.body

        // not writing service login here
        // service login -> service file
        await registerUser(email, password);

        res.status(201).json({
            success: true,
            message: "Registration successfull. Please login to continue"
        });
    } catch (error) {

        next(error)
        
    }
});

authRouter.post("/login", async(req, res, next) => {
    try {
        const { email, password } = req.body

        const {accessToken} = await loginUser(email, password);

        res.status(200).json({
            success: true,
            data: {accessToken},
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
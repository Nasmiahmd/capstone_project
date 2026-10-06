import { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import { AppError } from "../errors/AppError";

// Global error handler

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): void {

    if(err instanceof AppError){
        res.status(err.statusCode).json({
            success: false,
            messgae: err.message,
        });

        return;
    }

    logger.error({err}, "Unhandled error");
    res.status(500).json({
        success: false,
        message: "Internal server error",
    });
}
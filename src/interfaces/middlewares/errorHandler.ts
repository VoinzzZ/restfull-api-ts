import { Request, Response, NextFunction } from "express";
import { AppError } from "../../domain/errors/AppError";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    // Handle known operational errors (thrown intentionally)
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
        return;
    }

    // Handle unknown/unexpected errors (bugs, crashes)
    console.error("Unexpected error:", err);
    res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
};
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export const validate =
    (schema: ZodSchema) =>
        (req: Request, res: Response, next: NextFunction): void => {
            try {
                // Parse and replace req.body with validated + typed data
                req.body = schema.parse(req.body);
                next();
            } catch (error) {
                if (error instanceof ZodError) {
                    res.status(400).json({
                        status: "error",
                        message: "Validation failed",
                        errors: error.issues.map((e) => ({
                            field: e.path.join("."),
                            message: e.message,
                        })),
                    });
                    return;
                }
                next(error);
            }
        };
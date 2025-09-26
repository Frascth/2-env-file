import type { Request, Response, NextFunction } from 'express';
import { AppEnv } from '../constants/appEnvs.js';
import { HttpError } from '../errors/HttpError.js';

export const errorHandler = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let message = 'An unexpected error occurred';

    let statusCode = 500;

    const isProduction = process.env.APP_ENV === AppEnv.PRODUCTION;

    if (error instanceof HttpError) {
        statusCode = error.statusCode;
    }
    
    if (!isProduction && error instanceof Error) {
        message = error.message;
    }

    return res.status(statusCode).json({ message: message });
};
import type { Request, Response, NextFunction } from 'express';
import { AppEnv } from '../constants/appEnvs.js';
import { HttpError } from '../errors/HttpError.js';

export const errorHandler = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ message: error.message });
    }

    const isProduction = process.env.APP_ENV === AppEnv.PRODUCTION;

    if (isProduction) {
        return res.status(500).json({ message: 'An unexpected error occurred' });
    }
    
    const statusCode = (error as any)?.statusCode || 500;

    const message = (error as any)?.message || 'An unexpected error occurred';

    return res.status(statusCode).json({ message: message });
};
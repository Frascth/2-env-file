import { HttpError } from "./HttpError.js";

export class UnauthenticatedError extends HttpError {
    constructor(message: string = 'Unauthenticated') {
        super(message, 401);
    }
}
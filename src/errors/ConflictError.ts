import { HttpError } from "./HttpError.js";

export class ConflictError extends HttpError {
    constructor(message: string = 'Conflict') {
        super(message, 409);
    }
}
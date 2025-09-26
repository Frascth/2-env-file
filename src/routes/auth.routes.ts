import { Router } from 'express';
import { loginClient, registerClient } from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/login-client', loginClient);

authRouter.post('/register-client', registerClient);

export default authRouter;
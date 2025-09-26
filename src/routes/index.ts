// Combines all routes

import type { Request, Response } from 'express';
import { Router } from 'express';
import authRouter from './auth.routes.js';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.use('/auth', authRouter);

export default router;
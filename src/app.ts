import express from 'express';
import type { Express } from 'express';
import Router from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app: Express = express();

app.use(express.json());

app.use('/', Router);

app.use(errorHandler);

export default app;
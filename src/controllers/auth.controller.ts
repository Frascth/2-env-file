import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
import { getClientByEmail } from '../repositories/user.repository.js';
import * as authService from '../services/auth.service.js';
import { NotFoundError } from '../errors/NotFoundError.js';
import { UnauthenticatedError } from '../errors/UnauthenticatedError.js';
import { toSafeUser } from '../utils/user.js';

export const registerClient = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const safeClient = await authService.registerClient(email, password);

  return res.status(200).json({
    message: "Success register client",
    data: safeClient,
  });
};

export const loginClient = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const client = await getClientByEmail(email);

  if (!client) {
    throw new NotFoundError(`Client with email ${email} not found`);
  }

  const isPasswordMatch = await bcrypt.compare(password, client.password);

  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid Email and Password");
  }

  const token = generateToken(toSafeUser(client));

  return res.status(200).json({
    message: 'Login successful',
    data: {
      token,
    },
  });

};
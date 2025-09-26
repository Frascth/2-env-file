import jwt from 'jsonwebtoken';

export const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }

  const token = jwt.sign(payload, secret, {
    expiresIn: '24h', // Token will expire in 1 hour
  });

  return token;
};
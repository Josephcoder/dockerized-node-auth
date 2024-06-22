import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../errors/UnauthorizedError';

dotenv.config();

declare module 'http' {
  interface IncomingHttpHeaders {
    rpc: string;
  }
}
interface UserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      userData: UserPayload;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers['rpc']) {
    throw new UnauthorizedError();
  }
  try {
    const payload = jwt.verify(
      req.headers['rpc'],
      `${process.env.JWT_SECRET}`
    ) as UserPayload;

    req.userData = payload;
  } catch (error) {
    throw new UnauthorizedError();
  }
  next();
};

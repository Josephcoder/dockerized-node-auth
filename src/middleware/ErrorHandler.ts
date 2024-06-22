import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { CustomError } from '../errors/CustomError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.log(err);

  res.status(httpStatus.BAD_REQUEST).send({
    errors: [{ message: 'Something went wrong' }],
  });
};

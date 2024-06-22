import { ValidationError } from 'express-validator';
import httpStatus from 'http-status';
import { CustomError } from './CustomError';

export class RequestValidationError extends CustomError {
  statusCode = httpStatus.BAD_REQUEST;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: (err as any).param };
    });
  }
}

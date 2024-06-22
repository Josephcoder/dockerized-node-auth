import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { NotFoundError } from './errors/NotFoundError';
import { errorHandler } from './middleware/ErrorHandler';
import router from './routes/router';
import helmet from 'helmet';
import compression from 'compression';
import xss from './middleware/xss';

export const createApp = () => {
  const app = express();
  app.use(morgan('dev'));

  // set security HTTP headers
  app.use(helmet());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // sanitize request data
  app.use(xss());

  // gzip compression
  app.use(compression());

  // Enable CORS for all routes
  app.use(cors());

  // Enable CORS for preflight OPTIONS requests for all routes
  app.options('*', cors());

  app.use(router);

  app.all('*', async (req, res) => {
    throw new NotFoundError('Route not found');
  });

  app.use(errorHandler);

  return app;
};

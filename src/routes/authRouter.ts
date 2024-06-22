import { Router } from 'express';
import { body } from 'express-validator';

import AuthController from '../controllers/AuthController';

import { validateRequest } from '../middleware/ValidateRequest';
import UsersController from '../controllers/UsersController';

const router = Router();

router.post(
  '/auth',
  [
    body('username').not().notEmpty().withMessage('Invalid username'),
    body('password').not().notEmpty().withMessage('Invalid password'),
  ],
  validateRequest,
  AuthController.login
);
router.get('/auth/:user_id', UsersController.getUserPhone);

export { router as authRouter };

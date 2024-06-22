import { Router } from 'express';
// import UserController from '../controllers/UserController';

import UsersController from '../controllers/UsersController';

const router = Router();

router.get('/users/current', UsersController.getCurrentLogin);

export { router as userRouter };

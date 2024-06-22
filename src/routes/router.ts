import express from 'express';
import { authRouter } from './authRouter';
import { requireAuth } from '../middleware/RequireAuth';
import { userRouter } from './userRouter';

const router = express.Router();

const apiPath = '/api/v1';

// Public Routes
router.use(apiPath, authRouter);

// Protected Router
router.use(requireAuth);
// Protected Router

router.use(apiPath, userRouter);

export default router;

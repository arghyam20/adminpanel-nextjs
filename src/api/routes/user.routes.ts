import express from 'express';
import { listUsers, getUser, createUser } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createUserSchema } from '../validations/user.validation';

const router = express.Router();

router.get('/', authMiddleware, listUsers);
router.get('/:id', authMiddleware, getUser);
router.post('/', authMiddleware, validate(createUserSchema), createUser);

export default router;

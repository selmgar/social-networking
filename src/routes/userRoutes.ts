import { Router } from 'express';
import { createUser, getUserById, getUsers } from '../controllers/userController.js';

// Create a new router
const router = Router();

// GET & POST route for /api/users
router.route('/').get(getUsers).post(createUser);

// GET single user
router.route('/:userId').get(getUserById)

export default router;

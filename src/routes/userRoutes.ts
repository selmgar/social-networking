import { Router } from 'express';
import { getUsers } from '../controllers/userController.js';

// Create a new router
const router = Router();

// GET & POST route for /api/users
router.route('/').get(getUsers)

export default router;

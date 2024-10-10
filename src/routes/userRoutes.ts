import { Router } from 'express';
import { addFriendToUserById, createUser, deleteUserById, getUserById, getUsers, removeFriendFromUserById, updateUserById } from '../controllers/userController.js';

// Create a new router
const router = Router();

// GET & POST route for /api/users
router.route('/').get(getUsers).post(createUser);

// GET, PUT, DELETE single user
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

// Add friend to user
router.route('/:userId/friends/:friendId').post(addFriendToUserById).delete(removeFriendFromUserById);

export default router;

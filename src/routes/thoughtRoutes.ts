import { Router } from 'express';
import { addReactionToThought, createThoughtAndAddToUser, deleteReactionFromThought, deleteThoughtAndRemoveFromUser, getThoughtById, getThoughts, updateThoughtById } from '../controllers/thoughtController.js';

// Create a new router
const router = Router();

router.route('/').get(getThoughts).post(createThoughtAndAddToUser);

router.route('/:thoughtId').get(getThoughtById).put(updateThoughtById).delete(deleteThoughtAndRemoveFromUser);

router.route('/:thoughtId/reactions').post(addReactionToThought);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactionFromThought);

export default router;

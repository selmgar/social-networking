import { Request, Response } from 'express';
import Thought from "../models/thought.js";
import User from '../models/user.js';

// Get all users
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    return res.json(thoughts);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export const getThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });

    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    }

    if (thought.reactions.length > 0) {
      await thought.populate('reactions');
    }

    return res.json(thought);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export const updateThoughtById = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate({ _id: req.params.thoughtId }, req.body, { new: true });
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(thought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

export const createThoughtAndAddToUser = async (req: Request, res: Response) => {
  try {
    const createdThought = await Thought.create(req.body);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: createdThought._id } },
      { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({createdThought, updatedUser});
  } catch (err) {
    return res.status(500).json(err);
  }
}

export const deleteThoughtAndRemoveFromUser = async (req: Request, res: Response) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId });
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    const updatedUser = await User.findOneAndUpdate(
      { username: deletedThought.username },
      { $pull: { thoughts: deletedThought._id } },
      { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({deletedThought, updatedUser});
  } catch (err) {
    return res.status(500).json(err);
  }
}

export const addReactionToThought = async (req: Request, res: Response) => {
  try {
    const userLeavingReaction = await User.findOne({ username: req.body.username });
    if(!userLeavingReaction) {
      return res.status(404).json({ message: "User not found and can't leave a reaction" });
    }
    const updatedThought = await Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: req.body } },
      { new: true });

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(updatedThought);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export const deleteReactionFromThought = async (req: Request, res: Response) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    return res.json(updatedThought);
  } catch (err) {
    return res.status(500).json(err);
  }
}
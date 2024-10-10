import User from "../models/user.js";
import { Request, Response } from 'express';


// Get all users
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
}

// create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const createdUser = await User.create(req.body);
    res.json(createdUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

// Get a single user by their ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    if (user.thoughts.length > 0) {
      await user.populate('thoughts');
    }
    if (user.friends.length > 0) {
      await user.populate('friends');
    }

    return res.json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
}

export const updateUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate({_id: req.params.userId}, req.body, { new: true });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deleteUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete({_id: req.params.userId}, {new: true});
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User successfully deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
}

export const addFriendToUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const friend = await User.findOne({ _id: req.params.friendId });
    if (!friend) {
      res.status(404).json({ message: 'Friend not found' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const removeFriendFromUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}
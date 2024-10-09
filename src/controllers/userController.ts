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

      // TODO ensure this is working once we have thoughts and friends
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
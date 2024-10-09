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
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
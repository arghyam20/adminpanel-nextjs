import { NextApiRequest, NextApiResponse } from 'next';
import { userService } from '../services/user.service';
import { successResponse } from '../utils/api-response';

export const listUsers = async (req: any, res: any) => {
  const users = await userService.listUsers();
  return res.status(200).json(successResponse(users));
};

export const getUser = async (req: any, res: any) => {
  const { id } = req.query || req.params;
  const user = await userService.getUser(id);
  return res.status(200).json(successResponse(user));
};

export const createUser = async (req: any, res: any) => {
  const payload = req.body;
  const user = await userService.createUser(payload);
  return res.status(201).json(successResponse(user));
};

import type { Request, Response, NextFunction } from 'express';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import UserValidation from '../validation/userValidation.js';

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    UserValidation.userSchema.parse(req.body);
    const { email, password } = req.body;
    const existing = await User.getUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email already in use' });
    const hash = await argon2.hash(password);
    const user = await User.createUser(email, hash);
    return res.status(201).json({ data: { user } });
  } catch (err) {
    next(err);
  }
}

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    UserValidation.userSchema.parse(req.body);
    const { email, password } = req.body;

    const user = await User.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await argon2.verify(user.password, password);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET undefined');

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5m' });

    return res.status(200).json({ data: { token } });
  } catch (err) {
    next(err);
  }
}

export default {
  register,
  login,
};

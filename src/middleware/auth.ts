import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

async function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req?.headers?.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Missing token in Authorization header' });
  try {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET undefined');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
}

export default authenticate;

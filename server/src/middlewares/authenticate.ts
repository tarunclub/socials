import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../config/connectDB';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === 'string') throw new Error('Invalid token');

    const q = 'SELECT * FROM users WHERE id = ?';

    db.query(q, [decoded.id], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      if (data.length === 0)
        return res.status(404).json({ message: 'User not found' });

      req.headers['userId'] = data[0].id;

      next();
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

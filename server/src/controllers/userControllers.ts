import { Request, Response } from 'express';
import { db } from '../config/connectDB';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';
import { generateRandomString } from '../utils/generateRandomString';
import {
  registerSchema,
  loginSchema,
  updateProfileSchema,
} from '@tarunclub/social-common';

export const register = async (req: Request, res: Response) => {
  const parsedInput = registerSchema.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(400).json({ message: parsedInput.error });
  }
  try {
    const q = 'SELECT * FROM users WHERE email = ?';

    db.query(q, [parsedInput.data.email], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      if (data.length > 0)
        return res.status(400).json({ message: 'Email already exists' });

      // hash password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(parsedInput.data.password, salt);

      // create a new user
      const q =
        'INSERT INTO users (`id`, `name`, `email`, `password`, `profilePicture`) VALUES (?)';

      const id = generateRandomString(12).toString();

      const values = [
        id,
        parsedInput.data.name,
        parsedInput.data.email,
        hashedPassword,
        parsedInput.data.profilePicture,
      ];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json({ message: err.message });

        return res.status(201).json({ message: 'User created successfully' });
      });
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const parsedInput = loginSchema.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(400).json({ message: parsedInput.error });
  }
  try {
    const q = 'SELECT * FROM users WHERE email = ?';

    db.query(q, [parsedInput.data.email], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      if (data.length === 0)
        return res.status(400).json({ message: "Email doesn't exist" });

      // check password
      const validPassword = bcrypt.compareSync(
        parsedInput.data.password,
        data[0].password
      );

      if (!validPassword)
        return res.status(400).json({ message: 'Invalid password' });

      const token = generateToken(data[0].id);

      const userData = { ...data[0], password: undefined };

      return res
        .status(200)
        .json({ message: 'Logged in successfully', token, userData });
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: 'Logged out successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const userProfile = async (req: Request, res: Response) => {
  try {
    const q = 'SELECT * FROM users WHERE id = ?';

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      if (data.length === 0)
        return res.status(404).json({ message: 'User not found' });
      const { password, ...rest } = data[0];
      return res.status(200).json({ user: rest });
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const parsedInput = updateProfileSchema.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(400).json({ message: parsedInput.error });
  }
  try {
    const q = 'SELECT * FROM users WHERE id = ?';

    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      if (data.length === 0)
        return res.status(404).json({ message: 'User not found' });

      const user = data[0];

      if (parsedInput.data.name) user.name = parsedInput.data.name;
      if (parsedInput.data.username) user.username = parsedInput.data.username;
      if (parsedInput.data.email) user.email = parsedInput.data.email;
      if (parsedInput.data.profilePicture)
        user.profilePicture = parsedInput.data.profilePicture;

      const q = 'UPDATE users SET ? WHERE id = ?';

      db.query(q, [user, req.params.id], (err, data) => {
        if (err) return res.status(500).json({ message: err.message });

        return res.status(200).json({ message: 'User updated successfully' });
      });
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

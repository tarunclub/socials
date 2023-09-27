import { Request, Response } from 'express';
import { db } from '../config/connectDB';
import moment from 'moment';
import { generateRandomString } from '../utils/generateRandomString';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.headers['userId'];

    const q = `SELECT p.*, u.id AS userId, name, profilePicture FROM posts AS p JOIN users AS u ON p.userId = u.id LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC`;

    db.query(q, [userId, userId], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(200).json({ posts: data });
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const q =
      'INSERT INTO posts (`id`, `description`, `image`, `createdAt`, `userId`) VALUES (?)';

    const values = [
      generateRandomString(12).toString(),
      req.body.description,
      req.body.image,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      req.headers['userId'],
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(201).json({ message: 'Post created' });
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.headers['userId'];

    const q = `SELECT p.*, u.id AS userId, name, profilePicture FROM posts AS p JOIN users AS u ON p.userId = u.id WHERE p.userId = ? ORDER BY p.createdAt DESC`;

    db.query(q, [userId], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(200).json({ posts: data });
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;

    const q = `DELETE FROM posts WHERE id = ?`;

    db.query(q, [postId], (err, data) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.status(200).json({ message: 'Post deleted' });
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

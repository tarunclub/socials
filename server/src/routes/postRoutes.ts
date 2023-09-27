import express from 'express';
import {
  createPost,
  deletePost,
  getPosts,
  getUserPosts,
} from '../controllers/postControllers';
import { authenticate } from '../middlewares/authenticate';
const router = express.Router();

router.get('/', authenticate, getPosts);
router.post('/create', authenticate, createPost);
router.get('/user', authenticate, getUserPosts);
router.delete('/delete/:id', authenticate, deletePost);

export default router;

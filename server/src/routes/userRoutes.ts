import express from 'express';
import {
  login,
  register,
  updateUserProfile,
  userProfile,
} from '../controllers/userControllers';
import { authenticate } from '../middlewares/authenticate';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router
  .route('/profile/:id')
  .get(authenticate, userProfile)
  .put(authenticate, updateUserProfile);

export default router;

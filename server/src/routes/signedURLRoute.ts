import express from 'express';
import { getSignedURL } from '../controllers/signedURLControllers';
const router = express.Router();

router.get('/', getSignedURL);

export default router;

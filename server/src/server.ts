import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import commentRoutes from './routes/commentRoutes';
import likeRoutes from './routes/likeRoutes';
import relationshipRoutes from './routes/relationshipRoutes';
import signedURLRoute from './routes/signedURLRoute';

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/follow', relationshipRoutes);
app.use('/api/get-signed-url', signedURLRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

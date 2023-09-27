import { Request, Response } from 'express';
import generateSignedUrl from '../config/S3';

export const getSignedURL = async (req: Request, res: Response) => {
  try {
    const url = await generateSignedUrl();

    res.status(200).json({ url });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

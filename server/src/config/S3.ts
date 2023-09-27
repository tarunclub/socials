import AWS from 'aws-sdk';
import { generateRandomString } from '../utils/generateRandomString';

const s3 = new AWS.S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  signatureVersion: 'v4',
});

const randomString = generateRandomString(10);

const generateSignedUrl = async () => {
  const signedURL = await s3.getSignedUrlPromise('putObject', {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${randomString}`,
    Expires: 60,
  });

  return signedURL;
};

export default generateSignedUrl;

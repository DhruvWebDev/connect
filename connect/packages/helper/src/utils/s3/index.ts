import { S3Client } from "bun";
import dotenv from "dotenv"
dotenv.config();

// AWS S3
export const s3 = new S3Client({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  bucket: process.env.S3_BUCKET,
  endpoint: "https://s3.eu-north-1.amazonaws.com",
  region: "eu-north-1",
});


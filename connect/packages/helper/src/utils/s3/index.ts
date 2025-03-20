import { S3Client } from "bun";

// AWS S3
const s3 = new S3Client({
  accessKeyId: "access-key",
  secretAccessKey: "secret-key",
  bucket: "my-bucket",
  endpoint: "https://s3.us-east-1.amazonaws.com",
  region: "eu-north-1",
});

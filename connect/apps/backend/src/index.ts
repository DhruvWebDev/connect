import express from "express";
import editorRouter from "./routes/v1/editor";
import youtubeRouter from "./routes/v1/youtuber";
import cors from "cors";
import * as helper from "@repo/helper";
import { testMiddleware } from "./middleware/v1/test-middleware";
const app = express();
app.use(cors());

let PORT = process.env.NODE_ENV === "Production" ? 5000 : 3000;

app.use(express.json()); // Add this middleware
app.use("/editor", editorRouter);
app.use("/youtuber", youtubeRouter);

app.get('/generate-presigned-url', testMiddleware, async (req, res) => {
  const filename = req.query.filename;
  console.log(filename);
  const user_id = req.user?.userId;
  console.log(user_id);
  const role = req.user?.role;
  console.log(role);
  const fileRef = await helper.s3.file(filename as string);

  const url = fileRef.presign({
    expiresIn: 3600,
    method: "PUT",
  });
  console.log(url);
  res.status(200).json({ url });
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

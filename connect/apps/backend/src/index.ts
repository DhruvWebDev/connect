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
  try {
    const fileRef = await helper.s3.file(filename as string);

    const url = fileRef.presign({
      expiresIn: 3600,
      method: "PUT",
    });
    res.status(201).json({ url });
  
  } catch (error) {
    res.status(404).json({'error':error})
  }
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

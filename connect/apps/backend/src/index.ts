import express from "express";
import editorRouter from "./routes/v1/editor";
import youtubeRouter from "./routes/v1/youtuber";
import cors from "cors";

const app = express();
app.use(cors());

let PORT = process.env.NODE_ENV === "Production" ? 5000 : 3000;

app.use(express.json()); // Add this middleware
app.use("/editor", editorRouter);
app.use("/youtuber", youtubeRouter);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

import express from "express";
import { Router } from "express";
import { ExpressAuth } from "@auth/express";
import Google from "@auth/express/providers/google";
import dotenv from "dotenv";
import { db } from "@repo/db"
dotenv.config();

const youtuberRouter = Router();

// ✅ FIXED: Ensure `uploadVideoToS3` is awaited
youtuberRouter.post("/upload-video", async (req, res) => {
  try {
    const { url, youtuberId } = req.body
    const result = await db.video.create({
      data: {
        fileUrl: url, // Use the actual URL from the mockUrls array
        youtuberId, // Connect the video to the Youtuber by their ID
      }
    });
    res.status(201).json({ success: "Video uploaded successfully", url: mockUrls });
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
});

youtuberRouter.post("/assign-video", async (req, res) => {
  try {
    const { videoId, editorId } = req.body;
    const result = await db.video.update({
      where: {
        videoId
      },
      data: {
        editorId
      }
    })
    console.log(result)
    res.status(200).json(result);

  } catch (error) {
    res.status(404).json({ 'error': error })
  }
})

youtuberRouter.get("/get-edited-video-of-raw-video", async (req, res) => {
  try {
    const { rawVideoId } = req.body;

    const result = await db.video.findUnique({
      where: { videoId },
      include: { editedVideos: true }, // Include the edited video relation
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ 'error': error });
  }
})

youtuberRouter.patch("/update-status-of-video", async (req, res) => {
  try {
    const {editedVideoId, status} = req.body;
    const result = await db.editedVideo.update({
      where: {
        id: editedVideoId
      },
      data: {
        status
      }
    })
    console.log(result);
  } catch (error) {
    res.status(404).json({ 'error': error })
  }
})

youtuberRouter.post("/onboarding-editor", async (req, res) => {
  try {
    const { editorId, youtuberId } = req.body;
    const result = await db.editor.update({
      where: {
        id: editorId
      }, data: {
        associatedYt: youtuberId
      }
    })

    res.status(200).json(result);

  } catch (error) {
    res.status(404).json({ 'error': error })
  }
})

youtuberRouter.get("/get-editor", async (req, res) => {
  try {
    const { youtuberId } = req.body;
    const result = await db.youtuber.findMany({
      where: {
        id: youtuberId
      }, include: { Editor: true }
    });
    res.status(200).json(result);

  } catch (error) {
    res.status(404).json({ 'error': error })
  }
})

export default youtuberRouter;

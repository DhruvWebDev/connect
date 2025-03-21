import express from "express";
import { Router } from "express";
import { ExpressAuth } from "@auth/express";
import Google from "@auth/express/providers/google";
import dotenv from "dotenv";
import { db } from "@repo/db"
dotenv.config();

const youtuberRouter = Router();

// ✅ FIXED: Ensure `uploadVideoToS3` is awaited
youtuberRouter.post("/upload", async (req, res) => {
  // const formData = req.body.formData;
  try {
    // const upload = await uploadVideoToS3(formData);
    // const youtuberId = req.body.ytId;
    //Add the url to the db
    const mockUrls = [
      "https://example.com/video1.mp4",
      "https://example.com/video2.mp4",
      "https://example.com/video3.mp4"
    ];
    const youtuberId = "xyz";
    for (let url in mockUrls) {
      // Create a new video entry in the database with the specified file URL and associate it with the Youtuber using their ID
      const result = await db.video.create({
        data: {
          fileUrl: mockUrls[url], // Use the actual URL from the mockUrls array
          youtuber: { connect: { id: youtuberId } }, // Connect the video to the Youtuber by their ID
        }
      });
    }
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
    res.status(404).json({'error':error})
  }
})

youtuberRouter.get("/get-edited-video-of-raw-video", async (req, res) => {
  try {
    const { videoId } = req.body;

    const result = await db.video.findUnique({
      where: { videoId },
      include: { editedVideos: true }, // Include the edited video relation
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ 'error': error });
  }
})

youtuberRouter.post("/update-status-of-video", async (req, res) => {
  try {
    const videoId = req.body.videoId;
    const status = req.body.status;
    const result = await db.editedVideo.update({
      where: {
        id: videoId
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

youtuberRouter.post("/add-editor", async (req, res) => {
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

youtuberRouter.get("/editor", async (req, res) => {
  try {
    const { editorId } = req.body;
    const result = await db.youtuber.findMany({
      where: {
        id: editorId
      }, include: { Editor: true }
    });
    res.status(200).json(result);

  } catch (error) {
    res.status(404).json({ 'error': error })
  }
})

export default youtuberRouter;

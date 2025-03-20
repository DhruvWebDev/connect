import express, { Router } from "express";
import { db, VideoStatus, type Video } from "@repo/db";
import { hashPassword, MatchPassword, uploadVideoToS3 } from "../../lib/utils";
import jwt from "jsonwebtoken";

const editorRouter = Router();
editorRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);

    // Upload the credentials to the db
    const editorData = await db.editor.create({
      data: {
        username,
        email,
        hashedPassword,
      },
    });

    console.log("New editor registered:", editorData);
    res.status(201).json({ editorData });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ FIXED: Fetch user from DB, compare password, and generate JWT token
editorRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.editor.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const hashedPassword = user.hashedPassword;

    // Match password (Assuming hashPassword has a compare function)
    const isMatch = await MatchPassword(password,hashedPassword);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

import { VideoStatus } from "@prisma/client"; // Import the Prisma enum
import { connect } from "http2";

editorRouter.get("/assigned-video", async (req, res) => {
  const editorId = req.query.editor as string;
  // Log the editorId to verify it's being received correctly
  console.log("Editor ID from query:", editorId);
  
  if (!editorId) {
    return res.status(400).json({ error: "Editor ID is required" });
  }
  
  try {
    const result = await db.video.findMany({
      where: {
        editorId: editorId, // Use the variable, not a hardcoded string
      },
    });
    console.log("Videos found:", result);
    res.status(200).json(result);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


editorRouter.post("/update-video-status", async (req, res) => {
  const { status } = req.body;  // ✅ Correct
  const result = await db.video.update({
    where:{
      videoId:"10b43fd1-b9a9-4e76-b907-250b4f250fbb"
    },
    data:{
      status
    }
  })

  console.log(result);

  res.status(200).json(result);
})

editorRouter.post("/assign-editor", (req, res) => {

})


editorRouter.post("/upload-edited-video", async (req, res) => {
  const mockUrl = "https://wwwoifn.com";
  const videoId = "10b43fd1-b9a9-4e76-b907-250b4f250fbb";
  const editorId = req.body.editorId; // Get editorId from request body
  
  // Validate required fields
  if (!editorId) {
    return res.status(400).json({ error: "Editor ID is required" });
  }

  try {
    const result = await db.editedVideo.create({
      data: {
        fileUrl: mockUrl,
        videoId,
        editorId, // Add the required editorId field
      }
    });
    
    console.log("Edited video created:", result);
    res.status(201).json(result);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Placeholder routes
editorRouter.get("/youtuber-list", (req, res) => {
  res.json({ message: "Fetching list of YouTubers" });
});

editorRouter.get("/youtuber-dashboard", (req, res) => {
  res.json({ message: "Fetching YouTuber dashboard data" });
});

export default editorRouter;

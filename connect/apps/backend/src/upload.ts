const fs = require("fs");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2();
oauth2Client.setCredentials({ access_token: "" });

const youtube = google.youtube({
  version: "v3",
  auth: oauth2Client, // Ensure auth is passed as an OAuth client
});

async function uploadVideo() {
  const filePath = "C:/Users/mso15/Videos/Captures/video.mp4";

  try {
    const response = await youtube.videos.insert({
      part: "snippet,status",
      requestBody: {
        snippet: {
          title: "Test Video Upload",
          description: "Uploaded via API",
          tags: ["test", "youtube", "api"],
          categoryId: "22",
        },
        status: {
          privacyStatus: "public",
        },
      },
      media: {
        body: fs.createReadStream(filePath),
      },
    });

    console.log("✅ Video Uploaded! Video ID:", response.data.id);
  } catch (error) {
    console.error("❌ Upload Failed:", error);
  }
}

uploadVideo();

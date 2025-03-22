const fs = require("fs");
const { google } = require("googleapis");

const oauth2Client = new google.auth.OAuth2();
oauth2Client.setCredentials({ access_token: " ya29.a0AeXRPp7ja3OVtXt3vlg7N9glkKqL3UzboAxoqzZwCX0VGFhpf_oNnB7Hw7Bv5kqjkd4iSYufXUOZl-SvMPEQb-aFjJhqahn28as2wEnos8kMzmTbzaw5wxpjhmifrEM3nuEmCwH2HOBoOehgHUiuWPO9ci2wVcb4E9h9HzBkaCgYKAdwSARASFQHGX2Mi2weG0rDpNDwKPsgTOmtoFQ0175" });

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

// import * as helper from "@repo/helper";

// let result = helper.s3.file("dhruv.json");
// console.log(result);

// const password = "super-secure-pa$$word";

// // Writing JSON data to S3 file
// const data = JSON.stringify({ name: "John", age: 30 });

// await result.write(data);
// console.log("Data written successfully");

// // Generating a pre-signed URL
// const url = result.presign({
//   expiresIn: 3600, // 1 hour
//   acl: "public-read",
//   method: "PUT",
// });

// console.log("Pre-signed URL:", url);

// // Uploading the JSON data using fetch
// fetch(url, {
//   method: "PUT",
//   headers: {
//     "Content-Type": "application/txt",
//   },
//   body: data,
// })
//   .then((res) => console.log("Upload status:", res.status))
//   .catch((err) => console.error("Upload error:", err));



const express = require("express");
const { google } = require("googleapis");
const open = require("open");

const app = express();
const port = 5000;

const SCOPES = ["https://www.googleapis.com/auth/youtube.upload"];
<<<<<<< HEAD
const REDIRECT_URI =""
const GOOGLE_CLIENT_ID = "";
const GOOGLE_CLIENT_SECRET = "";
=======
const GOOGLE_CLIENT_ID=""
const GOOGLE_CLIENT_SECRET=""
const REDIRECT_URI = "";

>>>>>>> 05c4d5da5077c0de1c30235cf14fdc14b68e0ca8

const oauth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, REDIRECT_URI);

// Step 1: Redirect user to Google's OAuth 2.0 consent page
app.get("/auth", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "online",
    scope: SCOPES,
  });
  console.log("Auth URL:", authUrl)
  res.redirect(authUrl);
});

// Step 2: Handle OAuth callback
app.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("No code provided");
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    
    console.log("Access Token:", tokens.access_token);
    console.log("Refresh Token:", tokens.refresh_token);
    
    res.send("Authentication successful! You can now use the access token.");
  } catch (error) {
    console.error("Error retrieving access token", error);
    res.status(500).send("Error retrieving access token");
  }
});

// Start Express server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Open in browser: http://localhost:${port}/auth`);
});

import * as helper from "@repo/helper";

let result = helper.s3.file("dhruv.json");
console.log(result);

const password = "super-secure-pa$$word";

// Writing JSON data to S3 file
const data = JSON.stringify({ name: "John", age: 30 });

await result.write(data);
console.log("Data written successfully");

// Generating a pre-signed URL
const url = result.presign({
  expiresIn: 3600, // 1 hour
  acl: "public-read",
  method: "PUT",
});

console.log("Pre-signed URL:", url);

// Uploading the JSON data using fetch
fetch(url, {
  method: "PUT",
  headers: {
    "Content-Type": "application/txt",
  },
  body: data,
})
  .then((res) => console.log("Upload status:", res.status))
  .catch((err) => console.error("Upload error:", err));

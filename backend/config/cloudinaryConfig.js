require("dotenv").config(); // Load environment variables
const cloudinary = require("cloudinary").v2;
const path = require("path");

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dz4jym5dr", // Ensure this is correct
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debug: Log environment variables to ensure they are loaded
console.log("Cloudinary API Key:", process.env.CLOUDINARY_API_KEY);
console.log("Cloudinary API Secret:", process.env.CLOUDINARY_API_SECRET);

(async function () {
  try {
    // Resolve the file path to ensure it is correct
    const filePath = path.resolve(
      __dirname,
      "../../frontend/public/images/BowlLeaf.png"
    );

    // Upload the file to Cloudinary
    const results = await cloudinary.uploader.upload(filePath);
    console.log("Upload Successful:", results);

    // Generate a URL with transformations
    const url = cloudinary.url(results.public_id, {
      transformation: [
        { width: 500, height: 500, crop: "limit" },
        { quality: "auto" },
        { fetch_format: "auto" },
      ],
    });

    console.log("Transformed URL:", url);
  } catch (error) {
    console.error("Cloudinary Upload Error:", error.message);
  }
})();

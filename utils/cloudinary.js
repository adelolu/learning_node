const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "dz4cbgpax",
  api_key: "896213337638626",
  api_secret: process.env.API_SECRET,
});
module.exports = cloudinary;

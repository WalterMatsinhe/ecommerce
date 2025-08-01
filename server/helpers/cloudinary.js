const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dj0cglvgb',
  api_key: '749529725249672',
  api_secret: 'Dq0PKEEt6hXTYT2OaUKnAeksbEg',
});

// Multer stores file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload base64 image to Cloudinary
async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });
  return result;
}

// Export only what you defined
module.exports = { upload, imageUploadUtil };

backend/controllers/ideaController.js [4:15]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const cloudinary = require("../cloudinaryConfig");

// Helper: upload image buffer to Cloudinary
const uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



backend/controllers/userController.js [4:14]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const cloudinary = require("../cloudinaryConfig");

const uploadFromBuffer = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) resolve(result);
      else reject(error);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -




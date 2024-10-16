const multer = require('multer');

const photoUpload = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image')) {
      cb(null, true);
    } else {
      cb({ message: 'Unsupported file format' }, false);
    }
  },
  limits: { fileSize: 1024 * 1024 },
});

module.exports = photoUpload;

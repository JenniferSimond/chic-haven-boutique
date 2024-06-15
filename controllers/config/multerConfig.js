const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, callBackFunc) => {
    callBackFunc(null, path.join(__dirname, '../public/productImages')); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    callBackFunc(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
